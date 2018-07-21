import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import {vibrate} from './utils'
export default class Timer extends React.Component {
  constructor(){
      super()
      this.state={
          breakTime:5,
          workTime:25,
          toggle:false,
      }
  } 
 
  toggleStart(){
    this.setState(
      (prevState)=>(
        {
          toggle:!prevState.toggle,
          secondsCache:prevState.secondsCache,
          minutesCache:prevState.minutesCache
        }
      )
    )
  }

  handleWorkTime(text){
    const number=parseInt(text)
    if(isNaN(number) || number<=0){
      return
    }
    else{
      this.setState(
        ()=>({workTime:number,
        toggle:false})
      )
    } 
  }

  handleBreakTime(text){
    const number=parseInt(text)
    if(isNaN(number) || number<=0){
      return alert("Should be a positive number")
    }
    else{
      this.setState(
        ()=>({breakTime:number,toggle:false,})
      )
    } 
  }
  
  render() {
    console.log(this.state.toggle)
    console.log(" work time "+ this.state.workTime + " " + this.state.breakTime)
   
    const buttonTitle=this.state.toggle ? "PAUSE" : "START"
      return (
        <View style={styles.container}>
           
          <View style={{flex:2}}>
          <Counter toggle={this.state.toggle} workTime={this.state.workTime}
            breakTime={this.state.breakTime}/>
          </View>
          <View style={{flex:1}}>
          <Button title={buttonTitle} onPress={()=>(this.toggleStart())}/>
          </View>
          <View style={{flex:2, flexDirection:'row', alignItems:'flex-start'}}>
            <View>
            <Text style={styles.textInput2}> WorkTime  : </Text>
            <Text style={styles.textInput2}> BreakTime :</Text>
           
            
            </View>
            <View>
           
            
            <TextInput style={styles.textInput} placeholder="Set Work Time"
            onChangeText={(text)=>this.handleWorkTime(text)} keyboardType = 'numeric' 
            defaultValue={String(this.state.workTime)}/>
            <TextInput style={styles.textInput} placeholder="Set Break TIme"
            onChangeText={(text)=>this.handleBreakTime(text)} keyboardType = 'numeric'
            defaultValue={String(this.state.breakTime)}/>
            </View>
          </View>
        
        </View>
      );
    // }
    // else{
    //   return(
    //    <View style={styles.container}>
    //       <Button title="START / STOP" onPress={()=>(this.toggleStart())}/>
    //     </View>
    //   ) 
    // }
  }
}


class Counter extends React.Component {
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
        <Text style={styles.text}> {this.state.minutesCounter} : {this.state.secondsCounter}   
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
    justifyContent: 'space-evenly',
  },
  text:{
    fontSize:40,
    paddingBottom:20,
    color:'darkcyan'
  },
  textInput:{
    paddingTop:10,
    width:100,
    height:40,
  },
  textInput2:{
    paddingTop:16,
    width:100,
    height:40,
  }
});