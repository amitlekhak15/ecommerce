import React from 'react'

const CategoriesForm = ({handleSubmit,value,setValue}) => {
  return (
    <div>
     <form onSubmit={handleSubmit}>
  <div className="form-group  m-2">
    
    <input type="text" className="form-control"   placeholder='Enter new category' value={value} onChange={(e)=>setValue(e.target.value)}/>

    
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default CategoriesForm