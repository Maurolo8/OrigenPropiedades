let Persona = {
    ultimoidPersonas : 0,
    personas:[],
    
    inicio:function(){
        this.personas=memoria.leer("personas")
        this.ultimoidPersonas=memoria.leer('ultimoidPersonas')
        if(this.personas=[]){
            this.juegodedatos()
        }
        this.tipoPersona()
        this.listar()
    },
    
    crear:function(id,tipo, nombre, apellido, correo,telefono,direccion){
        return {
            id:        id,
            tipo:      tipo,
            nombre:    nombre,
            apellido:  apellido,
            correo:    correo,
            telefono:  telefono,
            direccion: direccion,

        }
    },
    
    alta: function(){
    
        let id           = this.generarid()
        id=parseInt(id)
        let tipo         = (document.getElementById("tipo").value).trim()
        let nombre       = (document.getElementById("nombre").value).trim()
        let apellido     = (document.getElementById("apellido").value).trim()
        let correo       = (document.getElementById("correo").value).trim()
        let telefono     = parseInt((document.getElementById("telefono").value).trim())
        let direccion    = (document.getElementById("direccion").value).trim()

    
        if (this.validar(tipo, nombre, apellido, correo, telefono, direccion)==true){
            let objPersona = this.crear(id,tipo, nombre, apellido, correo, telefono, direccion)
            this.personas.push(objPersona)
            this.listar()
            this.limpiar()
            memoria.escribir('personas', this.personas)
        }
        else{
            this.ultimoidPersonas--
            memoria.escribir('ultimoidPersonas', this.ultimoidPersonas)
        }
    },
    
    baja: function(){
        let id  = document.getElementById("id").value
        let pos = this.buscarpos(id, this.personas)
    
        if(pos<0){
            alert("Error en dar de baja, persona con este ID no encontrado")
        }
        else{
            this.personas.splice(pos,1)
            this.listar()
            alert('Persona dada de baja con exito')
        }
        memoria.escribir('personas', this.personas)
        this.limpiar()
    },
    
    modificar: function(){
        let id = document.getElementById('id').value
        let pos = this.buscarpos(id,this.personas)
        if(pos<0){
            alert('Error al modificar. Persona inexistente')
        }
        else{
                let objPersona = this.personas[pos]
                let tipo         = (document.getElementById("tipo").value).trim()
                let nombre       = (document.getElementById("nombre").value).trim()
                let apellido     = (document.getElementById("apellido").value).trim()
                let correo       = (document.getElementById("correo").value).trim()
                let telefono     = (document.getElementById("telefono").value).trim()
                let direccion    = (document.getElementById("direccion").value).trim()

                if (this.validar(tipo, nombre, apellido, correo, telefono, direccion)==true){
                objPersona.tipo      = tipo
                objPersona.nombre    = nombre
                objPersona.apellido  = apellido
                objPersona.correo    = correo
                objPersona.telefono  = telefono
                objPersona.direccion = direccion
                memoria.escribir('personas', this.personas)
                this.listar()
                alert('persona modificada con éxito')
            }
        }
        this.limpiar()
    },
    
    listar: function (){
        const lista = document.getElementById("lista");
        lista.innerHTML = "";
        for (let objPersona of this.personas) {
        const renglon = document.createElement("option");
            renglon.value = objPersona.id;
            renglon.text = "Id :"+objPersona.id+' - '+ "Tipo: " + objPersona.tipo + ", Nombre: "+objPersona.nombre + ", Apellido: "+objPersona.apellido + ", Teléfono: " + objPersona.telefono + ", Dirección: "+ objPersona.direccion + ", Correo electronico: "+ objPersona.correo;
            lista.add(renglon);
        }
    
    },
    
    buscarpos: function (id, array) {
        for (let pos = 0; pos < array.length; pos++) {
            let objpersona = array[pos];
            if (objpersona.id == id) {
                return pos;
            }
        }
        return -1;
    },
    
    limpiar: function(){
        document.getElementById("abmpersona").reset();
    },
    
    seleccionar: function(){
        let numero = document.getElementById('lista').value
        for(let objpersona of this.personas){
            if(numero==objpersona.id){
                document.getElementById("id").value           = objpersona.id
                document.getElementById("tipo").value         = objpersona.tipo
                document.getElementById("nombre").value       = objpersona.nombre
                document.getElementById("apellido").value     = objpersona.apellido
                document.getElementById("telefono").value     = objpersona.telefono
                document.getElementById("direccion").value    = objpersona.direccion
                document.getElementById("correo").value       = objpersona.correo
            }
        }
    },
    
    tipoPersona: function (){
        const lista = document.getElementById("tipo").options;
        lista.length = 0;
        elem = new Option("Seleccione un tipo");
        lista.add(elem);
        elem = new Option("Agente");
        lista.add(elem);
        elem = new Option("Comprador");
        lista.add(elem);
        elem = new Option("Propietario");
        lista.add(elem);
      },
    
    juegodedatos: function(){
         let datos=[
            {
                id:        1,
                tipo:      'Agente',
                nombre:    "Ignacio",
                apellido:  'Ferreira',
                correo:    "correo@email.com",
                telefono:  999999999,
                direccion: 'De por allá',
            },
            {
                id:        2,
                tipo:      'Agente',
                nombre:    "Wilfredo",
                apellido:  'Pons',
                correo:    "correo@email.com",
                telefono:  999999999,
                direccion: 'De por allá',
            },
            {
                id:        3,
                tipo:      'Comprador',
                nombre:    "Mauro",
                apellido:  'Pons',
                correo:    "correo@email.com",
                telefono:  999999999,
                direccion: 'De por allá',
            },
            {
                id:        4,
                tipo:      'Comprador',
                nombre:    "Silvana",
                apellido:  'Delgado',
                correo:    "correo@email.com",
                telefono:  999999999,
                direccion: 'De por allá',
            },
            {
                id:        5,
                tipo:      'Propietario',
                nombre:    "Selene",
                apellido:  'Lueiro',
                correo:    "correo@email.com",
                telefono:  999999999,
                direccion: 'De por allá',
            },
            {
                id:        6,
                tipo:      'Propietario',
                nombre:    "Valter",
                apellido:  'Valter',
                correo:    "correo@email.com",
                telefono:  999999999,
                direccion: 'De por allá',
            },
        ]
        for (let objPersona of datos){
            this.personas.push(objPersona)
            this.listar()
            memoria.escribir('personas', this.personas)
        }
    },
    
    
    validar:function(tipo, nombre, apellido, correo, telefono, direccion){
        let valid = true
        if(tipo=="Seleccione un tipo"){
            alert("Debe ingresar un tipo de persona")
            valid=false
            return valid
        }
        if(!nombre){
            alert("Debe ingresar un Nombre")
            valid=false
            return valid
        }
        if(!apellido){
            alert("Debe ingresar un Apellido")
            valid=false
            return valid
        }
        if(!direccion){
            alert("Debe ingresar una Direccion")
            valid=false
            return valid
        }
        if(telefono.length<9){
            alert("Debe ingresar un numero de teléfono válido")
            valid=false
            return valid
        }
        let emailV = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(emailV.test(correo)==false){
            alert("Debe ingresar un email válido")
            valid=false
            return valid
        }
        return valid
    },
    
    generarid: function() {
        this.ultimoidPersonas++;
        memoria.escribir('ultimoidPersonas', this.ultimoidPersonas)
        return this.ultimoidPersonas;
    },
    }