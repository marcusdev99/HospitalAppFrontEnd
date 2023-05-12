import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { useState } from "react";

export function Appointment(){

    let [data,setData] = useState()
    let [name, setName] = useState()
    let [maternalSurname, setMaternalSurname] = useState()
    let [paternalSurname, setPaternalSurname] = useState()
    let [doctor, setDoctor] = useState()
    let [appointmentDate, setAppointmentDate] = useState()
    let [surgery, setSurgery] = useState()


    const buttonAction = () => {
        axios.get('http://localhost:8080/appointments/'+data)
        .then((a)=>{
            setSurgery(a.data.surgeryId)
            setDoctor(a.data.doctorId)
            setAppointmentDate(a.data.dateAppointment)
            setName((a.data.patientName).split(" ")[0])
            setPaternalSurname((a.data.patientName).split(" ")[1])
            setMaternalSurname((a.data.patientName).split(" ")[2])
        })

    }

    const setAppointment = () => {
        axios.post('http://localhost:8080/appointments',
        {
            surgeryId : surgery,
            doctorId : doctor,
            dateAppointment : appointmentDate,
            patientName : `${name} ${maternalSurname} ${paternalSurname}`
        }).then((a)=>console.log(a)).catch(console.lo)
        console.log(name,maternalSurname,paternalSurname,doctor,appointmentDate,surgery)
        setSurgery('')
        setDoctor('')
        setAppointmentDate('')
        setName('')
        setMaternalSurname('')
        setPaternalSurname('')
    }

    return (
        <React.Fragment>
            <Grid container xs={12} mb={20}>
                <TextField value={data} onChange={e=> setData(e.target.value)} placeholder="Ingrese dato"></TextField>
                <Button onClick={buttonAction} variant="contained" m={2}>Buscar</Button>
            </Grid>

            <Typography m={5} variant="h4">Agregar cita</Typography>
            <Grid mb={5} container spacing={2}>
                <Grid xs={4}>
                    <TextField onChange={e => setSurgery(e.target.value)} value={surgery} placeholder="Consultorio" fullWidth>xs=8</TextField>
                </Grid>
                <Grid xs={4}>
                    <TextField onChange={e => setDoctor(e.target.value)} value={doctor} placeholder="Doctor" fullWidth>xs=4</TextField>
                </Grid>
                <Grid xs={4}>
                    <TextField onChange={e => setAppointmentDate(e.target.value)} value={appointmentDate} placeholder="Horario de consulta" fullWidth>xs=4</TextField>
                </Grid>
                <Grid xs={4}>
                    <TextField onChange={e => setName(e.target.value)} value={name} placeholder="Nombre del paciente" fullWidth>xs=8</TextField>
                </Grid>
                <Grid xs={4}>
                    <TextField onChange={e => setPaternalSurname(e.target.value)} value={paternalSurname} placeholder="Apellido paterno del paciente" fullWidth>xs=8</TextField>
                </Grid>
                <Grid xs={4}>
                    <TextField onChange={e => setMaternalSurname(e.target.value)} value={maternalSurname} placeholder="Apellido materno del paciente" fullWidth>xs=8</TextField>
                </Grid>
            </Grid>
            <Button onClick={setAppointment} variant="contained" m={2}>Enviar</Button>
        </React.Fragment>
    )

}