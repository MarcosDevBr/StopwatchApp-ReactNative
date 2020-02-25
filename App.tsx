import React, { Component } from 'react'
import {
   StyleSheet, Text, View, ScrollView, TouchableOpacity 
  } from 'react-native'
import moment from 'moment'


  function Timer({ interval, style }) {

    const duration = moment.duration(interval)
    const centiseconds = Math.floor(duration.milliseconds() / 10)
    return ( 
    <Text style={style}>
        {duration.minutes()}:{duration.seconds()},{centiseconds} 
    </Text>

    )
  }

  function RoundButton({  title, color, background, onPress, disables, disabled  }) {
    return(

      <TouchableOpacity 
        onPress={() => !disabled && onPress()}
        style={[ styles.button, { backgroundColor: background }]}
        activeOpacity={disables ? 1.0 : 0.7}
      >
        <View style={styles.buttonBorder}>
          <Text style={[ styles.buttonTitle, {color}]}>{title}</Text>
        </View>
      </TouchableOpacity>
       
    )
  }

  function Lap({ number, interval, fastest, slowest }) {

    const lapStyle = [   
      styles.lapText,
      fastest && styles.fastest,
      slowest && styles.slowest,  
    ]

    return( 
      <View style={styles.lap}> 

      <Text style={lapStyle}>Lap {number}</Text>
      <Timer style={lapStyle} interval={interval}/>

    </View>


    )
   

  }

  function LapsTable({ laps }) {
    
    const finishedLaps = laps.slice(1)
    let min = Number.MAX_SAFE_INTEGER
    let max = Number.MIN_SAFE_INTEGER 
    if(finishedLaps.length > 2) {
      finishedLaps.forEach(lap => {
        if(lap < min) min = lap
        if(lap > max) max = lap
      }); 
    } 
     
    return (
    
        <ScrollView style={styles.scrollView}>
        
         {laps.map((lap, index) => (
           <Lap 
              number={laps.length - index} 
              key={laps.length - index} 
              interval={lap} 
              fastest={lap === min}
              slowest={lap === max}
            />
         ))}
        </ScrollView>
   
    )
  }

  function ButtonsRow({ children }){
    return(
    <View style={styles.bottonsRow}>{ children }</View>
    )
  }
export default class App extends Component {

  constructor(props) {
    super(props)
    this.setState = {
      
    
      start: 0,
      now: 0,
      laps: [ ],
    }
  }

  start = () => {

  }
 
  render() {

    const { now, laps, start } =  this.setState
    const timer = now - start

    return (
      <View style={styles.container}>
       <Timer interval={timer} style={styles.timer}/>

       <ButtonsRow>

        <RoundButton title='Reset' color='#FFFFFF' background='#3D3D3D'/>

        <RoundButton
            title='Start' 
            color='#50D167' 
            background='#1B361f'
            onPress={this.start}
          />

       </ButtonsRow>
      
       <LapsTable laps={laps} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    paddingTop: 130,
    paddingHorizontal: 20,
   
  },
  timer: {
    color: '#ffffff',
    fontSize: 76,
    fontWeight: '200',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 18,
  }
,
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',

  },
  bottonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 80,
    marginBottom: 30,
  },
  lapText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#151515',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  scrollView: {
    alignSelf: 'stretch'
  },
  fastest: {
    color: '#4BC05F',
  },
  slowest: {
    color: '#CC3531',
  },
  timerContainer: {
    flexDirection: 'row',
  },
 
});
