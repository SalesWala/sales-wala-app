import { useMutation } from "@apollo/react-hooks";
import { useObject, useRealm } from "@realm/react";
import { PUNCHOutMutation } from "@src/apollo/queries/backend-queries";
import LoadingSpinner from "@src/components/LoadingSpinner";
import SalesWalaText from "@src/components/SalesWalaText/SalesWalaText";
import { AttendanceModal } from "@src/realm/models/AttendanceModal";
import { setPunchIn, updateAttendance } from "@src/redux/slices/attendanceSlice";
import moment from "moment";
import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Modal from 'react-native-modal';
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";



interface PunchOutModalProps {
    isVisible: boolean;
    onClose: () => void;
    punchInData: AttendanceModal
}



const PunchOutModal = ({ isVisible, onClose, punchInData }: PunchOutModalProps) => {
    const [isLoading, setLoading] = useState(false)
    const toast = useToast()
    const dispatch = useDispatch()
    const realm = useRealm()
    const [writePunchOut] = useMutation(PUNCHOutMutation, {
        errorPolicy: 'all',
    })
    const attendanceObject = punchInData && useObject(AttendanceModal, punchInData.id)
    const handlePunchout = async () => {
        let isErrorFound = false
        setLoading(true)
        try {



            const resp = await writePunchOut();
        

            if (attendanceObject !== null) {
                realm.write(() => {
                    //@ts-ignore
                    attendanceObject.punchOutTime = new Date().toString()
                    dispatch(updateAttendance(JSON.stringify(attendanceObject)))

                    toast.show("Successfully Punched out", {
                        type: 'success',
                        placement: 'bottom',
                        duration: 2000,
                        animationType: 'slide-in',
                    })
                })

            }



        } catch (err) {
            isErrorFound = true
            console.error("handlePunchout", err)
        }
        if (!isErrorFound) {
            dispatch(setPunchIn(null))

        }

        setLoading(false)
        onClose()

    }


    return (
        <View style={styles.container}>
            <Modal
                isVisible={isVisible}
                onBackdropPress={() => {
                    if (!isLoading) {
                        onClose()
                    }
                }}
                onBackButtonPress={onClose}>
                {!isLoading ? <View style={styles.modalContent}>
                    <SalesWalaText fontSize={14} fontWeight="500">
                        Do you want to punch out?
                    </SalesWalaText>

                    <View style={{
                        flexDirection: "row",
                        marginTop: 15

                    }}>
                        <TouchableOpacity onPress={handlePunchout}>
                            <SalesWalaText fontSize={16} fontWeight="600"  >
                                Punch Out
                            </SalesWalaText>


                        </TouchableOpacity>

                        <View style={{ flex: 1 }} />
                        <TouchableOpacity

                            onPress={() => { onClose() }}

                            style={{
                                alignSelf: "flex-end",

                                alignContent: "flex-end",
                                justifyContent: "flex-end",
                                alignItems: "flex-end",

                            }}>

                            <SalesWalaText fontSize={16} fontWeight="600" color="danger" >
                                Cancel
                            </SalesWalaText>
                        </TouchableOpacity>
                    </View>
                </View> : <View style={[styles.modalContent, { flexDirection: "row" }]}>

                    <LoadingSpinner />
                    <SalesWalaText
                        fontSize={14}
                        fontWeight="400"
                        style={{
                            justifyContent: 'center',
                            marginRight: 5,
                            alignSelf: 'center',
                        }}>
                        Punching Out
                    </SalesWalaText>
                </View>}
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    menuItem: {
        padding: 10,
        borderBottomWidth: 0.3,
        borderBottomColor: 'rgba(172, 165, 172, 1)',
    },
});
export default PunchOutModal

