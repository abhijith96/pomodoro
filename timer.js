import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView, ScrollView  } from 'react-native';
import Counter from './counter'



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

  handleSubmit(wt, bt){
    const num1=parseInt(wt)
    const num2=parseInt(bt)
    if(isNaN(num1) || num1<=0){
      return alert("Should be a positive number")
    }
    if(isNaN(num2) || num2<=0){
      return alert("Should be a positive number")
    }
    this.setState(
      ()=>({breakTime:num2,toggle:false,workTime:num1})
    )
    
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
          <View style={{flex:1, paddingTop:10}}>
          <Button title={buttonTitle} onPress={()=>(this.toggleStart())}/>
          </View>
          <KeyboardAvoidingView style={{flex:1, flexDirection:'row', alignItems:'flex-start', justifyContent:'space-evenly'}}
          >
            <View style={{flex:1, alignItems:'center'}}>
            <Text style={styles.textInput2}> WorkTime  : </Text>
            <Text style={styles.textInput2}> BreakTime :</Text>
           
            
            </View>
            <View style={{flex:1}} enabled>
           
            
            <TextInput style={styles.textInput} placeholder="Set Work Time"
            onChangeText={(text)=>this.handleWorkTime(text)} keyboardType = 'numeric'
            defaultValue={String(this.state.workTime)}/>

            <TextInput style={styles.textInput} placeholder="Set Break TIme"
            onChangeText={(text)=>this.handleBreakTime(text)} keyboardType = 'numeric'
            defaultValue={String(this.state.breakTime)}/>

            </View>
          </KeyboardAvoidingView>
          

          
        
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
