# React_with_indexDB_data_store
Its a simple React application which uses indexDb to store data and display it

#opening Database
   request = window.indexedDB.open("kotmaster", 3);
#Error Handler
    request.onerror=(e)=>{
      console.log("error",e);
    }
#success Handler
    request.onsuccess=(e)=>{
        db=request.result;
        tx=db.transaction("FormDataStore",'readwrite');
        store=tx.objectStore("FormDataStore");
        index=store.index("Formtext");

        db.onerror=(e)=>{
          console.log("error",e);
        }
# Here am trying to insert data into indexDB 
        var myAutoIncrement = store.autoIncrement;       
        store.add({"qId":myAutoIncrement,"username":this.state.uname.value,"password":this.state.password.value,"email":this.state.email.value});

        let q1=store.getAll();
        q1.onsuccess=(e)=>
        {
          this.setState({
            localData:e.target.result
          })
        }
        tx.oncomplete=()=>{
          db.close();
        }
    }
#Creating or updating the version of the database
    request.onupgradeneeded=(e)=>{
      let db=request.result,
          store=db.createObjectStore("FormDataStore",{autoIncrement:true});
          index=store.createIndex("Formtext","Formtext",{unique:false});
    }
  }
