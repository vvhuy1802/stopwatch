import React, {Component} from "react"
import {Text,View,StyleSheet,TouchableHighlight} from "react-native"
import formatTime from "minutes-seconds-milliseconds"

class StopWatch extends Component{
    constructor(props){
        super(props);
        this.state={
            timeElapsed:null,
            running:false,
            startTime:null,
            laps:[],
        };
        this.handleStartPress=this.handleStartPress.bind(this);
        this.startStopButton=this.startStopButton.bind(this);
        this.handleLapPress=this.handleLapPress.bind(this);
    }
   
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.timerWrapper}>
                        <Text style={styles.timer}>
                            {formatTime(this.state.timeElapsed)}
                        </Text>
                    </View>
                    <View style={styles.buttonWrapper}>
                        {this.lapButton()}
                        {this.startStopButton()}   
                    </View>
                </View>
                <View style={styles.footer}>
                    {this.laps()}
                </View>
        </View>
        )
    }
    handleStartPress(){
        if(this.state.running){
            clearInterval(this.interval);
            this.setState({running:false});
            return
        }
        this.setState({startTime:new Date(),running:true});

        this.interval=setInterval(()=>{
            this.setState({
                timeElapsed:new Date() - this.state.startTime,
                running:true
            });
        },30);
    }
    handleLapPress(){
        var lap=this.state.timeElapsed;
        this.setState({
            startTime:new Date(),
            laps:this.state.laps.concat([lap])
        });
    }
    startStopButton(){
        var style=this.state.running? styles.stopButton:styles.startButton;

        return(
            <TouchableHighlight
            underlayColor={"gray"}
            onPress={this.handleStartPress}
            style={[styles.button,style]}
            >
                <Text>{(this.state.running ? 'Stop' : 'Start')}</Text>

            </TouchableHighlight>
        )
    }
    lapButton(){
        return (
            <TouchableHighlight style={styles.button}
            underlayColor="gray"
            onPress={this.handleLapPress}
            >
                <Text>
                    Lap
                </Text>
            </TouchableHighlight>
        )
    }
    laps(){
        return(
            this.state.laps.map(function(time,index){
                return(
                    <View key={index} style={styles.lap}>
                        <Text style={styles.lapText}>
                            Lap #{index+1}
                        </Text>
                        <Text style={styles.lapText}>
                            {formatTime(time)}
                        </Text>
                    </View>
                )
            })
        )
    }
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
