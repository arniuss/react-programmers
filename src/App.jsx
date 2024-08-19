import { useEffect, useState } from "react"
import "./App.css"
import rawData from "./rawData.json"
import ListOfProgrammers from "./components/ListOfProgrammers/ListOfProgrammers"
import PageContainer from "./components/PageContainer/PageContainer"
import ProgrammerForm from "./components/ProgrammerForm/ProgrammerForm"
import Toggler from "./components/Toggler/Toggler"
import TasksForm from './components/TasksForm/TasksForm'

function App() {
  const [programmers, setProgrammers] = useState(rawData.programmers)
  const [newProgrammer, setNewProgrammer] = useState({
    id:
      programmers.length > 0
        ? Math.max(...programmers.map((prog) => prog.id)) + 1
        : 1,
    name: "",
    level: "Junior",
  })
  const [valid, setValid] = useState(false)
  const [validTask, setValidTask] = useState(false)
  const [activeTab, setActiveTab] = useState(1)
  const [linesOfCodeOfTask, setLinesOfCodeOfTask] = useState(0)
  const [linesOfCodePerDay, setLinesOfCodePerDay] = useState(0)
  const [daysToComplete, setDaysToComplete] = useState(0)  

  
  useEffect(() => {
    const calculateTotalLinesOfCodePerDay = () => {
      const total = programmers.reduce((sum, programmer) => {
        if (programmer.level === "Junior") {
          return sum + 100;
        } else if (programmer.level === "Senior") {
          return sum + 200;
        }
        return sum;
      }, 0);
      setLinesOfCodePerDay(total);
    };
    calculateTotalLinesOfCodePerDay();
  }, [programmers]);

  useEffect(() => {
    if (daysToComplete > 0) {
      const isValid = linesOfCodePerDay >= (linesOfCodeOfTask / daysToComplete);
      setValidTask(isValid);
    } else {
      setValidTask(false);
    }
  }, [linesOfCodeOfTask, linesOfCodePerDay, daysToComplete]);

  const validateData = (prog) => {
    if (prog.name.trim().length < 5) {
      setValid(false)
    } else {
      setValid(true)
    }
  }
  const handleAdd = () => {
    setProgrammers((programmers) => {
      return [...programmers, newProgrammer]
    })
    const newProg = {
      id: newProgrammer.id + 1,
      name: "",
      level: "Junior"
    }
    setNewProgrammer(newProg)
    validateData(newProg)
  }

  const handleChoose = (name) => {
    switch(name){
      case 'list-of-programmers': {
        setActiveTab(1)
        break
      }
      case 'tasks-form': {
        setActiveTab(2)
        break
      }      
      default:break
    }
  }

  const handleChange = (e) => {
    const source = e.target.name
    const value = e.target.value
    let updatedProgrammer
    switch (source) {
      case "name": {
        updatedProgrammer = { ...newProgrammer, name: value }
        break
      }
      case "level": {
        updatedProgrammer = { ...newProgrammer, level: value }
        break
      }
      default:
        break
    }
    setNewProgrammer(updatedProgrammer)
    validateData(updatedProgrammer)
  }

  const handleDelete = (idToDelete) => {
    const temp = programmers.filter((prog) => prog.id !== idToDelete)
    setProgrammers(temp)
  }
  
  const handleTasks = (e) => {
    const name = e.target.name
    const value = parseFloat(e.target.value);
    switch(name){
      case 'lines':{
        setLinesOfCodeOfTask(value)
        break
      }
      case 'days':{
        setDaysToComplete(value)
        break
      }
      default: break;
    }
  }

  const onAdd = () =>{
    alert('Your task has been succesfully added')
  }

  return (
    <div className="App">
      <PageContainer>
        <h1>Your app for handling projects</h1>
        <Toggler onChoose={handleChoose} active={activeTab} />
        {activeTab === 1 && (
          <>
        <h2>Your team</h2>
        <ListOfProgrammers data={programmers} onDelete={handleDelete} />
        <ProgrammerForm
          valid={valid}
          onChange={handleChange}
          onAdd={handleAdd}
          data={newProgrammer}
        />
        </>
        )}
        {activeTab === 2 && (
          <>
            <TasksForm 
              valid={validTask}
              onChange={handleTasks}
              onAdd={onAdd}
            />
            <p>Your total lines of code per day is: {linesOfCodePerDay}</p> 
          </>
        )}        
      </PageContainer>
    </div>
  )
}

export default App
