import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    inviteLink: {
        color: 'blue',
    },
    mainInfoContainer: {

    },
    otherInfoContainer: {

    },
    container: {
        display: 'flex',
        alignItems: 'center',
        margin: '0.1em'
    },
    fieldList: {
        display: 'flex',
        flexDirection: 'column' 
    },
    fieldContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    fieldLabel: {
        padding: '0.1em'
    },
    fieldTextInput: {
        padding: '0.1em',
        height: 'auto',
        backgroundColor: 'white'
    },
    profileButtonContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    profileButton: {
        backgroundColor: 'red'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    }
})
