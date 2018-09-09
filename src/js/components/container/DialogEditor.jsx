import React, { Component } from 'react';
import ReactDOM from "react-dom";
import * as data from '../../../../../prototipoChat/chat.json'
require("downloadjs")
class DialogEditor extends Component {

  constructor(props) {
    super(props)
    this.state = data
  }

  saveJson(e){
    require("downloadjs")(JSON.stringify(this.state), 'chat.json', 'application/json');
  }

  addNewMensageToGroup(e){
    let characterData = this.state
    const characterName = e.target.getAttribute('datacharacter')
    const groupName = e.target.getAttribute('datagroup')

    const newMensage = {
      "msg":"NotDefined",
      "delayMax": 0,
      "delayMin": 0,
      "typingDelay": 0,
      "wait": 0,
      "done": 0, 
      "userInput" : 0,
      "user": "NotDefined"
    }

    characterData.default[characterName][groupName].push(newMensage)
    this.setState(characterData)
  }
  addNewGroupToCharacter(e){
    let characterData = this.state
    const characterName = e.target.getAttribute('datacharacter')
    const newGroup = [
      {"name": "NotDefined"  },
      {
        "msg":"NotDefined",
        "delayMax": 0,
        "delayMin": 0,
        "typingDelay": 0,
        "wait": 0,
        "done": 0, 
        "userInput" : 0,
        "user": "NotDefined"
      }
    ]

    characterData.default[characterName].NotDefined = newGroup
    this.setState(characterData)
  }
  addNewCharacter(e){
    let characterData = this.state
    const newCharacter = 
      {
        "name": "NotDefined",
        "NotDefined":[
          {"name": "NotDefined"  },
          {
            "msg":"NotDefined",
            "delayMax": 0,
            "delayMin": 0,
            "typingDelay": 0,
            "wait": 0,
            "done": 0, 
            "userInput" : 0,
            "user": "NotDefined"
          }
        ]
      };


    characterData.default.NotDefined = newCharacter

    this.setState(characterData)
  }
  inputNameChangeHandler(e) {
    Object.values(this.state).map((element) => {
      if(e.target.value == "" ||  e.target.name == ""){
        let name = (this.getKeyByValue(this.state.default, this.state.default[e.target.name]))
        if(name != 'MockName' &&  e.target.name != ""){
          let characterData = this.state
          characterData.default[e.target.name].name = ''
          let jsonString = JSON.stringify(characterData)
          jsonString = jsonString.replace(name, 'MockName')      
          characterData = JSON.parse(jsonString)
          this.setState(characterData)
        }else{
          let characterData = this.state
          characterData.default['MockName'].name = e.target.value
          let jsonString = JSON.stringify(characterData)
          jsonString = jsonString.replace('MockName', e.target.value)

          characterData = JSON.parse(jsonString)
        
          this.setState(characterData)
        }
        
      }else{
        let characterData = this.state
        characterData.default[e.target.name].name = e.target.value
        let jsonString = JSON.stringify(characterData)
        jsonString = jsonString.replace(e.target.name, e.target.value)

        characterData = JSON.parse(jsonString)
       
        this.setState(characterData)
      }
      
    })
  }

  inputGroupName(e){
    Object.values(this.state).map((element) => {
      if(e.target.value == "" ||  e.target.name == ""){
        let name = (this.getKeyByValue(this.state.default[e.target.getAttribute('dataCharacter')], this.state.default[e.target.getAttribute('dataCharacter')][e.target.name]))
        if(name != 'MockName' &&  e.target.name != ""){
          let characterData = this.state
          characterData.default[e.target.getAttribute('dataCharacter')][e.target.name][0].name = ''
          let jsonString = JSON.stringify(characterData)
          jsonString = jsonString.replace(new RegExp(`"${name}"`, "g"), '"MockName"')      
          characterData = JSON.parse(jsonString)
          this.setState(characterData)
        }else{
          let characterData = this.state
          characterData.default[e.target.getAttribute('dataCharacter')]['MockName'].name = e.target.value
          let jsonString = JSON.stringify(characterData)
          jsonString = jsonString.replace('"MockName"', e.target.value)

          characterData = JSON.parse(jsonString)
        
          this.setState(characterData)
        }
        
      }else{
        let characterData = this.state
        characterData.default[e.target.getAttribute('dataCharacter')][e.target.name][0].name = e.target.value
        let jsonString = JSON.stringify(characterData)
        jsonString = jsonString.replace(new RegExp(`"${e.target.name}"`, "g"), `"${e.target.value}"`)

        characterData = JSON.parse(jsonString)
       
        this.setState(characterData)
      }
      
    })
  }

  inputZeroHandler(e){
    let mensagesList = []
    let characterData = this.state
    const field = e.target.getAttribute('dataField')
    const characterName = e.target.getAttribute('datacharacter')
    const groupName = e.target.getAttribute('dataGroup')

    Object.values(this.state.default).map((character) => {
      Object.values(character).map((group) =>{
        if(this.getKeyByValue(character, group) != 'name'){
          let cont = 0
          group.forEach(mensage => {
            if(mensage.name == undefined){
              if(mensage[field] == e.target.name){
                characterData.default[characterName][groupName][cont][field] = e.target.value
              }
            }
            cont ++
          });
        }
      })
    })

    this.setState(characterData)
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  render() {
    const group_div = {
      'margin-left': '1em',
      'border-left':'1px solid black',
      'margin-top': '1em'
    }
    const msg ={
      'margin-left':'2em',
      'border-left':'1px solid black',
      'margin-top':'.5em',
      'margin-bottom': '.5em'
    }
    const main_div={
      'margin-top': '1em',
      'margin-bottom': '1em',
      'border-left':'1px solid black'
    }
    const inlineInput={

    }
    const msg_wrapper={
      'margin-top':'1em',
      'border-top':'1px solid black'
    }
    return (
      Object.values(this.state).map((element) => {
        return Object.values(element).map((character) => {
          return ([
            <div style={main_div}>
              <input name={character.name} value={character.name} onChange={this.inputNameChangeHandler.bind(this)}></input>
              <div style={group_div}>
                {Object.values(character).map((groups)=> {
                  if(this.getKeyByValue(character, groups) != 'name')
                  {
                    return [
                      <input dataCharacter={character.name} name={this.getKeyByValue(character, groups)} value={groups[0].name} onChange={this.inputGroupName.bind(this)}></input>,                        
                      <div style={msg}>
                        {Object.values(groups).map((group)=> {
                          if(this.getKeyByValue(character, groups) == 'default'){
                            return <input name={group.msg} value={group.msg} onChange={this.inputNameChangeHandler.bind(this)}></input>                
                          }else{
                            switch(group.wait){
                              case 0:
                                return ([
                                  <div style={msg_wrapper}>
                                    <p style={inlineInput}>Mensage: </p>
                                    <input name={group.msg} dataGroup={this.getKeyByValue(character, groups)} dataField='msg' dataCharacter={character.name} value={group.msg} onChange={this.inputZeroHandler.bind(this)}></input>
                                    <p style={inlineInput}>delayMax: </p>
                                    <input name={group.delayMax} dataGroup={this.getKeyByValue(character, groups)} dataField='delayMax' dataCharacter={character.name} value={group.delayMax} onChange={this.inputZeroHandler.bind(this)}></input>
                                    <p style={inlineInput}>delayMin: </p>
                                    <input name={group.delayMin} dataGroup={this.getKeyByValue(character, groups)} dataField='delayMin' dataCharacter={character.name} value={group.delayMin} onChange={this.inputZeroHandler.bind(this)}></input>
                                    <p style={inlineInput}>typingDelay: </p>
                                    <input name={group.typingDelay} dataGroup={this.getKeyByValue(character, groups)} dataField='typingDelay' dataCharacter={character.name}v value={group.typingDelay} onChange={this.inputZeroHandler.bind(this)}></input>
                                    <p style={inlineInput}>wait: </p>
                                    <input name={group.wait} dataGroup={this.getKeyByValue(character, groups)} dataField='wait' dataCharacter={character.name} value={group.wait} onChange={this.inputZeroHandler.bind(this)}></input>
                                    <p style={inlineInput}>userInput: </p>
                                    <input name={group.userInput} dataGroup={this.getKeyByValue(character, groups)} dataField='userInput' dataCharacter={character.name} value={group.userInput} onChange={this.inputZeroHandler.bind(this)}></input>
                                    <p style={inlineInput}>user: </p>
                                    <input name={group.user} dataGroup={this.getKeyByValue(character, groups)} dataField='user' dataCharacter={character.name} value={group.user} onChange={this.inputZeroHandler.bind(this)}></input>
                                  </div>
                                ])
                              case 'options':
                                return ([
                                  <div style={msg_wrapper}>
                                    <p style={inlineInput}>Option 1: </p>
                                    <input name={group.opt1} dataGroup={this.getKeyByValue(character, groups)} value={group.opt1} onChange={this.inputNameChangeHandler.bind(this)}></input>
                                    <p style={inlineInput}>Value 1: </p>
                                    <input name={group.val1} dataGroup={this.getKeyByValue(character, groups)} value={group.val1} onChange={this.inputNameChangeHandler.bind(this)}></input>
                                    <p style={inlineInput}>Option 2: </p>
                                    <input name={group.opt2} dataGroup={this.getKeyByValue(character, groups)} value={group.opt2} onChange={this.inputNameChangeHandler.bind(this)}></input>
                                    <p style={inlineInput}>Value 2: </p>
                                    <input name={group.val2} dataGroup={this.getKeyByValue(character, groups)} value={group.val2} onChange={this.inputNameChangeHandler.bind(this)}></input>
                                    <p style={inlineInput}>Option 3: </p>
                                    <input name={group.opt3} dataGroup={this.getKeyByValue(character, groups)} value={group.opt3} onChange={this.inputNameChangeHandler.bind(this)}></input>
                                    <p style={inlineInput}>Value 3: </p>
                                    <input name={group.val3} dataGroup={this.getKeyByValue(character, groups)} value={group.val3} onChange={this.inputNameChangeHandler.bind(this)}></input>
                                    <p style={inlineInput}>User: </p>
                                    <input name={group.user} dataGroup={this.getKeyByValue(character, groups)} value={group.user} onChange={this.inputNameChangeHandler.bind(this)}></input>
                                  </div>
                                ])
                              case 'event':
                                break
                            }
                          }
                        })}
                      </div>,
                      <div>
                        <button dataCharacter={character.name} dataGroup={this.getKeyByValue(character, groups)} onClick={this.addNewMensageToGroup.bind(this)}>Add New Mensage to {this.getKeyByValue(character, groups)}</button>
                      </div>
                    ]
                  }
                })}
              </div>,
              <div>
                <button dataCharacter={character.name} onClick={this.addNewGroupToCharacter.bind(this)}>Add New Group to {character.name}</button>
              </div>
             </div>,
             <button onClick={this.addNewCharacter.bind(this)}>Add New Character</button>,
             <button onClick={this.saveJson.bind(this)}>Save File</button>
          ]);
        })
      })
    );
  }
}

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<DialogEditor />, wrapper) : false;