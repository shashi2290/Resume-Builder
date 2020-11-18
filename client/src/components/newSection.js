import React from 'react';
import style from './newSection.module.css'



const NewSection = ({ readonly, sectionData, setSectionData, index }) => {
    
    const handleChange = (e) => {   
        
        const value = e.target.value;
        const name = e.target.name; 
        let datas = [...sectionData];
        let data = {...datas[index]};    

        if (name === 'title'){
            data.title = value;
            //console.log(data.title);
            datas[index] = data; 
            //console.log(datas[index]);
            setSectionData(datas);       
        } else if(name === 'body'){
            data.body = value;
            datas[index] = data;
            setSectionData(datas);
        }
        //console.log(sectionData);
        
    };
    
  return (
    <div>
      <form autoComplete='off' spellCheck={false} className={style.newSectionForm} action="">
        
        <input
          readOnly={readonly}
          onChange={handleChange}
          type="text"
          name='title'
          value={sectionData[index].title}
        />
        
        <textarea  className = {style.textArea}
          readOnly={readonly}          
          onChange={handleChange}          
          name = 'body'
          value={sectionData[index].body}
          rows= "4"
          cols= "100"  
                
        />
                
      </form>
     
    </div>
  );
};

export default NewSection;
