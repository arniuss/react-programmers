import './ProgrammerForm.css'  

function ProgrammerForm({ data, valid, onChange, onAdd}){
    return(
        <div className='programmer-form'>
            <input type="text"
            placeholder='Name of programmer'
            name='name' onChange={onChange} value={data.name}/>
            <select 
                name="level" 
                id="level" 
                onChange={onChange} 
                value={data.level}
            >
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
            </select>
            <button disabled={!valid} onClick={onAdd}>Add</button>
        </div>
    )
}
export default ProgrammerForm