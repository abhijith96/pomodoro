
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {vibrate} from './utils'

export default class Counter extends React.Component {
  constructor(props){
      super(props)
      this.state={
          secondsCounter:0,
          minutesCounter:25,
          mode:1,
          workTime:25,
          breakTime:5
      }
  } 
  componentWillReceiveProps(nextProps){
   
  if(this.props.workTime!==nextProps.workTime || this.props.breakTime!==nextProps.breakTime){
    if(this.state.mode===1){
      //clearInterval(this.interval)
      this.setState(()=>(
        {
          workTime:nextProps.workTime,
          breakTime:nextProps.breakTime,
          minutesCounter:nextProps.workTime,
          secondsCounter:0
        }
      ))
    }
    else{
      //clearInterval(this.interval)
      this.setState(()=>(
        {
          workTime:nextProps.workTime,
          breakTime:nextProps.breakTime,
          minutesCounter:nextProps.breakTime,
          secondsCounter:0
        }
      ))
    }
  }  

  if(!nextProps.toggle){
    clearInterval(this.interval)
  }
  else{
    this.interval=setInterval(()=>{
      this.setState(
          (prevState)=>(
              {
                  secondsCounter:prevState.secondsCounter ? prevState.secondsCounter -1 : 59,
                  minutesCounter:prevState.secondsCounter ? prevState.minutesCounter : (prevState.minutesCounter -1), 
                  
              }
          )
      )
    }, 1000)
  }


  }
  
  componentDidUpdate(){
      if(this.state.minutesCounter <= 0 && this.state.secondsCounter <= 0){
        vibrate()
        vibrate()
        if(this.state.mode){
          this.setState(()=>(
            {
              secondsCounter:0,
              minutesCounter:this.state.breakTime,
              mode:0
            }
          )
        )

        }
          else{
            this.setState(()=>(
              {
                secondsCounter:0,
                minutesCounter:this.state.workTime,
                mode:1,
              }
            )
          )
  
            }
          
        }
      
  }
  componentWillUnmount(){
    clearInterval(this.interval)
  } 
  handleReset(){
    if(this.state.mode){
    this.setState(()=>(
      {
        secondsCounter:0,
        minutesCounter:this.state.workTime
      }
    ) 
    )
    }
    else{
      this.setState(()=>(
        {
          secondsCounter:0,
          minutesCounter:this.state.breakTime
        }
      ) 
      )
      }
  }  
  
  render() {
    const timertype=this.state.mode ? "WORK TIMER" : "BREAK TIMER"
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{timertype}</Text>
        <Text style={styles.text}> {this.state.minutesCounter<10 ?
         '0'+ String(this.state.minutesCounter): this.state.minutesCounter} : {this.state.secondsCounter<10
         ?'0'+ String(this.state.secondsCounter):this.state.secondsCounter}   
        </Text>
        <Button title="reset" onPress={()=>(this.handleReset())}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text:{
    fontSize:40,
    paddingBottom:20,
    color:'darkcyan'
  },
  textInput:{
    paddingTop:10,
    width:60,
    height:40,
  },
  textInput2:{
    paddingTop:16,
    height:40,
  }
});