import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Button, Divider } from 'react-native-elements'
import { Picker } from '@react-native-community/picker'
import { firebase } from '../../firebase/config'
import { SkillDisplay } from '../../components'
import SkillSelector from '../../components/SkillSelector'

export default function SelfAssessmentScreen(props) {
    const [selectedSkillCollection, setSelectedSkillCollection] = useState()
    const [availableSkillCollections, setAvailableSkillCollections] = useState([])
    const [availableSkills, setAvailableSkills] = useState([])
    const [userSkills, setUserSkills] = useState({})
    const [oldUserSkills, setOldUserSkills] = useState({})
    const userRef = firebase.firestore().collection('users')
    const skillCollectionRef = firebase.firestore().collection('skillCollections')
    const skillRef = firebase.firestore().collection('skills')
    const userId = firebase.auth().currentUser.uid

    useEffect(() => {
        skillCollectionRef
            .get()
            .then(
                snapshot => {
                    const newSkillCollections = {}
                    snapshot.forEach(doc => {
                        const skillCollectionData = doc.data()
                        const listedSkills = Object.entries(skillCollectionData.skills).map(
                            ([id, item]) => ({ 
                                id: id, 
                                weight: item.weight
                            })
                        );
                        listedSkills.sort((a, b) => b.weight - a.weight)

                        const job = {
                            'name' : skillCollectionData.name,
                            'skills' : listedSkills,
                            'id' : doc.id
                        }
                        newSkillCollections[doc.id] = job
                    })
                    console.log(Object.entries(newSkillCollections).map(([key, item]) => key))
                    setAvailableSkillCollections(newSkillCollections)
                    setSelectedSkillCollection(Object.entries(newSkillCollections)[0][0])
                }
            )
        skillRef
            .get()
            .then(
                snapshot => {
                    const newSkills = {}
                    snapshot.forEach(doc => {
                        const skillData = doc.data()

                        const skill = {
                            'name' : skillData.name,
                            'id' : doc.id
                        }
                        newSkills[doc.id] = skill
                    })
                    setAvailableSkills(newSkills)
                }
            )
        
        userRef
            .doc(userId)
            .get()
            .then((doc) => {
                console.log('Querying ', userId)
                if (!doc.exists) {
                    alert('User not found in secondary DB.')
                }

                const retrievedUser = doc.data();
                setOldUserSkills(retrievedUser.skills);
                setUserSkills(retrievedUser.skills);
            })
    }, [])

    const matchingSkills = () => {
        console.log('Start  ')
        console.log(selectedSkillCollection)
        if (!selectedSkillCollection || availableSkills.length == 0) return []

        const chosenSkills = []

        for (const skill of availableSkillCollections[selectedSkillCollection].skills) {
            console.log('Picking skill ', skill.id)
            if (!(skill.id in userSkills)) {
                chosenSkills.push(availableSkills[skill.id])
            }
        }

        return chosenSkills
    }

    const updateSkill = (skillId, newLevel) => {
        const newUserSkills = {...userSkills};
        if (newLevel) {
            if (!newUserSkills[skillId]) {
                newUserSkills[skillId] = { id: skillId};
            }
            newUserSkills[skillId].level = newLevel;
        }
        else {
            delete newUserSkills[skillId];
        }
        setUserSkills(newUserSkills);
    }

    const saveSkills = () => {
        const skillsToBeSaved = {};

        for (const [skillId, skill] of Object.entries(userSkills)) {
            skillsToBeSaved[skillId] = {
                level: skill.level
            }
        }

        userRef
            .doc(userId)
            .update({
                skills: skillsToBeSaved
            })
            .then(() => setOldUserSkills(userSkills))
    }

    const discardSkills = () => {
        setUserSkills(oldUserSkills)
        props.navigation.navigate('Profile')
    }

    return (
        <View>
            <Text>Pick an area</Text>
            <Picker
                selectedValue={selectedSkillCollection}
                onValueChange={(itemValue, itemIndex) => setSelectedSkillCollection(itemValue)}>
                {Object.entries(availableSkillCollections).map(([key, item]) => <Picker.Item label={item.name} value={key} key={key}/>)}
            </Picker>
            <View>
                {matchingSkills().map(skill => <SkillSelector name={skill.name} level={userSkills[skill.id]?.level} onLevelChanged={(newLevel) => updateSkill(skill.id, newLevel)} />)}
            </View>
            <Divider orientation="horizontal" subHeader="Chosen Skills"/>
            <View>
                {Object.entries(userSkills).map(([id, skill]) => <SkillDisplay name={availableSkills[id].name} level={userSkills[skill.id]?.level} onLevelChanged={(newLevel) => updateSkill(id, newLevel)} />)}
            </View>
            <Button title="Save" onPress={saveSkills} />
            <Button title="Discard" onPress={discardSkills} />
        </View>
    )
}