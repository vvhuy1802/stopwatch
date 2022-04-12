import React,{useEffect,useState} from 'react';
import {Text,View,StyleSheet,TouchableHighlight,ScrollView} from "react-native"
import formatTime from "minutes-seconds-milliseconds"

function StopWatch (props) {
    const [timeElapsed,setTimeElapsed]=React.useState(null);
    const [startTime,setStartTime]=React.useState(null);
    const [running,setRunning]=React.useState(false);
    const [laps,setLaps]=React.useState([]);
    useEffect(() => {
        let inter;
        if (running) {
            inter = setInterval(() => {
                setTimeElapsed(new Date() - startTime)
            }, 10)
        }
        return () => clearInterval(inter)
    }, [running, timeElapsed])
    const startStopButton=()=>{
        var style=running? styles.stopButton:styles.startButton;
        return(
            <TouchableHighlight
            underlayColor={"gray"}
            onPress={()=>{
                setStartTime(new Date())
                setRunning(!running)
            }
            }
            style={[styles.button,style]}
            >
                <Text>{(running ? 'Stop' : 'Start')}</Text>

            </TouchableHighlight>
        )
    }
    const lapButton= () =>{
        return (
            <TouchableHighlight style={styles.button}
            underlayColor="gray"
            onPress={handleLapPress}
            >
                <Text>
                    Lap
                </Text>
            </TouchableHighlight>
        )
    }
    const handleLapPress=()=>{
        var lap = timeElapsed;
        setStartTime(new Date())
        setLaps(laps.concat([lap]))
    }
    const lapss =()=>{
        return(
            laps.map(function(time,index){
                return(
                    <ScrollView>
                    <View key={index} style={styles.lap}>
                        <Text style={styles.lapText}>
                            Lap #{index+1}
                        </Text>
                        <Text style={styles.lapText}>
                            {formatTime(time)}
                        </Text>
                    </View>
                    </ScrollView>
                )
            })
        )
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.timerWrapper}>
                    <Text style={styles.timer}>
                        {formatTime(timeElapsed)}
                    </Text>
                </View>
                <View style={styles.buttonWrapper}> 
                    {lapButton()}
                    {startStopButton()}
                </View>
            </View>
            <View style={styles.footer}>
                {lapss()}
            </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex:1,
        margin:20
    },
    header:{
        flex:1
    },
    footer:{
        flex:1
    },
    timerWrapper:{
        flex:5,
        justifyContent:"center",
        alignItems:"center"
    },
    buttonWrapper:{
        flex:3,
        flexDirection:"row",
        justifyContent: "space-around",
        alignItems:"center"
    },
    lap:{
        justifyContent:"space-around",
        flexDirection:"row",
        backgroundColor:"lightray",
        padding:10,
        marginTop:10
    },
    button:{
        borderWidth:2,
        height:100,
        width:100,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center"
    },
    timer:{
        fontSize:60
    },
    lapText:{
        fontSize:30
    },
    startButton:{
        borderColor:"green"
    },
    stopButton:{
        botderColor:"red"
    }
})

export default StopWatch