function sayHello(name){
    if(!name) return "error";
    console.log("Hello"+name);
    return "hi there: "+ name;
    
    console.log("Not executed");
}

function testFn(){
    let x="Samantha";
    let res=sayHello(x);
    console.log(res);
}

let travel = city => "traveling to " + city;

let t1=travel("Monaco");
let t2=travel("Rome");
console.log(t1,t2);

function Dog(name, a){
    this.name=name;
    this.age=a;
    this.owner="Samantha";
}
class Cat{
    constructor(name,age,color){
        this.name=name;
        this.age=age;
        this.color=color;
    }
    roar(){
        console.log("I'm roarriiiiing");
    }
}
function testObj(){
    //obj literal
    let lola={
        name:"Lola",
        age:"3"
    };
    console.log(lola);
    // obj constructor
    let fido = new Dog("fido",4);
    let scooby = new Dog("Scooby",60);
    console.log(fido);
    console.log(scooby);
    // class
    let a = "Garfield";
    let garfield = new Cat(a,30,"Orange");
    console.log(garfield);
    garfield.color="blue";
    // use the obj
    console.log(lola.name);
    console.log(fido.age);
    garfield.roar();
}

function testReq(){
   $.ajax({
       type:"GET",
       url:"http://restclass.azurewebsites.net/api/test",
       success:function(res){
           console.log("Request OK",res);
       },
       error:function(error){
           console.error("Request failed :( ", error);
       }
   }); 
}