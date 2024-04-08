let Venta = {

    ventas:[],
    propiedades:[],
    ultimoidVentas : 0,
    personas:[],

    inicio:function(){
        this.ventas         = memoria.leer("ventas")
        this.propiedades    = memoria.leer("propiedades")
        this.personas       = memoria.leer('personas')
        this.ultimoidVentas = memoria.leer('ultimoidVentas')
        this.cargarAgentes()
        this.cargarComprador()
        this.cargarPropiedades()
        this.cargarPropietario()
        this.listar()
        this.listarA()
    },
    
    crear:function(idV,propiedad,agente,comprador,propietario){
        return {
            idV:         idV,
            propiedad:   propiedad,
            agente:      agente,
            comprador:   comprador,
            propietario: propietario,
        }
    },
    
    alta: function(){
        
        let idV             = this.generarid()
        let idP             = document.getElementById('idP').value
        let idAgente        = document.getElementById("idAgente").value
        let idComprador     = document.getElementById("idComprador").value
        let idPropietario   = document.getElementById("idPropietario").value
        let propiedad = ''
        for (let objPropiedad of this.propiedades){
            if(objPropiedad.id == idP){
                propiedad = objPropiedad
            }
        }
        let agente = ''
        for (let objAgente of this.personas){
            if(objAgente.id == idAgente){
                agente = objAgente
            }
        }
        let comprador = ''
        for (let objComprador of this.personas){
            if(objComprador.id == idComprador){
                comprador = objComprador
            }
        }
        let propietario = ''
        for (let objPropietario of this.personas){
            if(objPropietario.id == idPropietario){
                propietario = objPropietario
            }
        }

        if (this.validar(idV,idP,idAgente,idComprador,idPropietario)==true){
            let objVenta = this.crear(idV,propiedad,agente,comprador,propietario)
            this.ventas.push(objVenta)
            this.listar()
            this.limpiar()
            memoria.escribir('ventas', this.ventas)
            let pos = this.buscarposP(propiedad.id, this.propiedades)
            this.propiedades.splice(pos,1)
            memoria.escribir('propiedades', this.propiedades)
            this.listarA()

        }
        else{
            this.ultimoidVentas--
            memoria.escribir('ultimoidVentas', this.ultimoidVentas)
        }
    },
    
    devolucion: function(){
        let id = document.getElementById("idV").value
        let pos = this.buscarpos(id, this.ventas)
    
        if(pos<0){
            alert("Error en dar de baja, Venta con este ID no encontrado")
        }
        else{
            let propiedadBaja = this.ventas[pos].propiedad
            this.propiedades.push(propiedadBaja)
            this.ventas.splice(pos,1)
            this.listar()
            this.listarA()
            memoria.escribir('propiedades', this.propiedades)
            alert('Venta devuelta con exito')
        }
        memoria.escribir('ventas', this.ventas)
        this.limpiar
    },
    
    modificar: function(){
        let id = document.getElementById('idV').value
        let pos = this.buscarpos(id,this.ventas)
        if(pos<0){
            alert('Error al modificar. Venta inexistente')
        }
        else{
            let objVenta = this.ventas[pos]
            let idP             = document.getElementById('idP').value
            let idAgente        = document.getElementById("idAgente").value
            let idComprador     = document.getElementById("idComprador").value
            let idPropietario   = document.getElementById("idPropietario").value
            let propiedad = ''
            for (let objPropiedad of this.propiedades){
                if(objPropiedad.id == idP){
                    propiedad = objPropiedad
                }
            }
            let agente = ''
            for (let objAgente of this.personas){
                if(objAgente.id == idAgente){
                    agente = objAgente
                }
            }
            let comprador = ''
            for (let objComprador of this.personas){
                if(objComprador.id == idComprador){
                    comprador = objComprador
                }
            }
            let propietario = ''
            for (let objPropietario of this.personas){
                if(objPropietario.id == idPropietario){
                    propietario = objPropietario
                }
            }
            if (this.validar(idV,idP,idAgente,idComprador,idPropietario)==true){
                objVenta.propiedad   =propiedad
                objVenta.agente      =agente
                objVenta.comprador   =comprador
                objVenta.propietario =propietario
        
                memoria.escribir('ventas', this.ventas)
                this.listar()
                alert('Venta modificado con éxito')
            }
        }
        
        this.limpiar()
    },

    listarA: function(){
        let lista = document.getElementById('listaP').options
        lista.length=0
    
        for(let objPropiedad of this.propiedades){
            let texto= "Id :"+objPropiedad.id+' - '+ "Tipo: " + objPropiedad.propiedad + ", Barrio: "+objPropiedad.barrio + ", Dirección: "+objPropiedad.direccion + ", Precio: " + objPropiedad.precio + ", Descripción: "+ objPropiedad.descripcion;
    
            let elemento = new Option (texto, objPropiedad.id)
            lista.add(elemento)
        }
    },

    listar: function(){
        let lista = document.getElementById('lista').options
        lista.length=0
    
        for(let objVenta of this.ventas){
            let texto= "ID:"+objVenta.idV + ': ('+objVenta.propiedad.propiedad+") $"+ objVenta.propiedad.precio+ ", "+objVenta.propiedad.barrio+", "+objVenta.propiedad.direccion
    
            let elemento = new Option (texto, objVenta.idV)
            lista.add(elemento)
        }
    },
    
    buscarposP: function (id, array) {
        for (let pos = 0; pos <= array.length; pos++) {
            let objVenta = array[pos];
            if (objVenta.id == id) {
                return pos;
            }
        }
        return -1;
    },

    buscarpos: function (id, array) {
        for (let pos = 0; pos <= array.length; pos++) {
            let objVenta = array[pos];
            if (objVenta.idV == id) {
                return pos;
            }
        }
        return -1;
    },
    
    limpiar: function(){
        document.getElementById("abmVentas").reset();    
    },

    seleccionarP: function(){
        let numero = document.getElementById('idP').value
        for(let objPropiedad of this.propiedades){
            if(numero==objPropiedad.id){
                document.getElementById('tipoP').value= objPropiedad.propiedad
                document.getElementById('precio').value= objPropiedad.precio
                document.getElementById('porcentaje').value= (objPropiedad.precio)*(0.05)
            }
        }
    },

    seleccionar: function(){
        let numero = document.getElementById('listaP').value
        for(let objPropiedad of this.propiedades){
            if(numero==objPropiedad.id){
                document.getElementById('idP').value= numero
                document.getElementById('tipoP').value= objPropiedad.propiedad
                document.getElementById('precio').value= objPropiedad.precio
                document.getElementById('porcentaje').value= (objPropiedad.precio)*(0.05)
            }
        }
    },

    seleccionarV: function(){
        let numero = document.getElementById('lista').value
        for(let objVenta of this.ventas){
            if(numero==objVenta.idV){
                document.getElementById('idV').value= objVenta.idV
                document.getElementById('idP').value= objVenta.propiedad.id
                document.getElementById('precio').value= objVenta.propiedad.precio
                document.getElementById('porcentaje').value= (objVenta.propiedad.precio)*(0.05)
                document.getElementById('tipoP').value= objVenta.propiedad.propiedad
                document.getElementById('idAgente').value= objVenta.agente.id
                document.getElementById('idComprador').value= objVenta.comprador.id
                document.getElementById('idPropietario').value= objVenta.propietario.id
                
            }
        }
    },


    cargarPropiedades: function (){
        const lista = document.getElementById("idP").options;
        lista.length = 0;
  
        const elemBase = new Option("Seleccione una Propiedad","");
        lista.add(elemBase);
        
        for (let objPropiedad of this.propiedades) {
            const elemento = new Option('('+objPropiedad.id+') '+objPropiedad.barrio+', '+objPropiedad.direccion+", $"+objPropiedad.precio, objPropiedad.id);
            lista.add(elemento);
        }
    },
    cargarAgentes: function (){
        const lista = document.getElementById("idAgente").options;
        lista.length = 0;
  
        const elemBase = new Option("Seleccione un Agente","");
        lista.add(elemBase);
        
        for (let objAgente of this.personas) {
            if(objAgente.tipo == "Agente"){
                const elemento = new Option('('+objAgente.id+') '+objAgente.nombre+' '+objAgente.apellido+', tel.:'+objAgente.telefono, objAgente.id);
                lista.add(elemento);
            }
        }
    },
    cargarComprador: function (){
        const lista = document.getElementById("idComprador").options;
        lista.length = 0;
  
        const elemBase = new Option("Seleccione un Comprador","");
        lista.add(elemBase);
        
        for (let objComprador of this.personas) {
            if(objComprador.tipo == "Comprador"){
                const elemento = new Option('('+objComprador.id+') '+objComprador.nombre+' '+objComprador.apellido+', tel.:'+objComprador.telefono, objComprador.id);
                lista.add(elemento);
            }
        }
    },
    cargarPropietario: function (){
        const lista = document.getElementById("idPropietario").options;
        lista.length = 0;
  
        const elemBase = new Option("Seleccione un Propietario","");
        lista.add(elemBase);
        
        for (let objPropietario of this.personas) {
            if(objPropietario.tipo == "Propietario"){
                const elemento = new Option('('+objPropietario.id+') '+objPropietario.nombre+' '+objPropietario.apellido+', tel.:'+objPropietario.telefono, objPropietario.id);
                lista.add(elemento);
            }
        }
    },
    
    validar:function(idV,idP,idAgente,idComprador,idPropietario){
        let valid = true
        if(!idP){
            alert("Debe ingresar un ID de Propiedad")
            valid=false
            return valid
        }
        if(!idAgente){
            alert("Debe ingresar un ID de Agente")
            valid=false
            return valid
        }
        if(!idV){
            alert("Debe ingresar un ID de Venta")
            valid=false
            return valid
        }
        if(!idComprador){
            alert("Debe ingresar un ID de Comprador")
            valid=false
            return valid
        }
        if(!idPropietario){
            alert("Debe ingresar un ID Propietario")
            valid=false
            return valid
        }
        return valid
    },
    generarid: function() {
        this.ultimoidVentas++;
        memoria.escribir('ultimoidVentas', this.ultimoidVentas)
        return this.ultimoidVentas;
    },
}