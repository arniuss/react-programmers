import './Toggler.css';

function Toggler({ onChoose, active }) {
    const handleClick = (e) => {
        onChoose(e.target.name);
    };

    return (
        <div className='page-toggler-container'>
            <h2>Toggle view</h2>
            <div className='page-toggler'>
                <button 
                    className={`toggler-btn ${active === 1 ? 'active' : ''}`} 
                    name='list-of-programmers' 
                    onClick={handleClick}
                >
                    List of programmers
                </button>
                <button 
                    className={`toggler-btn ${active === 2 ? 'active' : ''}`} 
                    name='tasks-form' 
                    onClick={handleClick}
                >
                    Form for planning tasks
                </button>
            </div>
        </div>
    );
}

export default Toggler;