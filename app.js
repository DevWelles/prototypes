//napisano po staroj sintaksi pomoću funkcionalnih prototyppova

//poveži sve metode (prototypes) od klasa koje nasljeđuju sa npr. Student.prototoype = new Osoba(); i to odraditi prvo tj prije nego sto overridamo sa Student.protype.izvješće = ... vlastite metode određee klase za izvješća

//klasa Osoba
function Osoba(ime="",prezime="") {
  this.ime = ime;
  this.prezime = prezime;
};
Osoba.prototype.izvjesce = function(){
  return `Ja sam ${this.ime} ${this.prezime}. Volim sve što vole mladi`
};

//Klasa Student
function Student(ime, prezime){
  Osoba.call(this, ime, prezime) //preko ovoga nasljeđuje samo propertye odnosno construktorsku funkciju, jer u construktrosku funkciju smijemo pisati samo propertyee
  this.upisaniKolegiji = [];
  this.polozeniKolegiji = [];
};
Student.prototoype = new Osoba(); //ovako nasljeđuje sve metode iz Osoba (u ovom slučaju samo izvješće). prototype je u biti objekt preko kojeg se nasljeđuju metode
Student.prototype.prijaviIspit = function(kolegij){
  kolegij.listaStudenata.push(this.ime + this.prezime);
};
Student.prototype.ispisUpisanihKolegija = function(){
  const kolegiji = this.upisaniKolegiji.map(kolegij => (" " + kolegij.imeKolegija));
  let ispis;
  if (kolegiji.length === 0){
    ispis = "Nisam upisao nove kolegije"
  }else {
    ispis = "Upisao sam" + kolegiji
  }
  return ispis
};
Student.prototype.ispisPolozenihKolegija = function(){
  let ispis = this.polozeniKolegiji.map(kolegij => (" " + kolegij.imeKolegija));
  if(ispis.length === 0){
    ispis = "nisam položio ni jedan kolegij"
  } else {
    ispis =  `polozio sam${ispis}`
  }return ispis
};
Student.prototype.izvjesce = function() { //tu overwriteamo metodu nasljeđenu od osoba i sad student ima svoje izvješće jer će prvo njega dohvatiti, a onda njegovog pretka samo u slučaju da nenađe metodu u svojoj klasi
  return `Ja sam student ${this.ime} ${this.prezime}. ${this.ispisUpisanihKolegija()} i
  ${this.ispisPolozenihKolegija()}.`
};
Student.prototype.dodajKolegij = function(kolegij) {
  this.upisaniKolegiji.push(kolegij);
};
Student.prototype.dodajPolozeniKolegij = function(kolegij) {
  this.polozeniKolegiji.push(kolegij);
}


//Klasa profesor

function Profesor (ime, prezime) {
  Osoba.call(this, ime, prezime);
  this.listaKolegija = [];
};
Profesor.prototype = new Osoba();
Profesor.prototype.ocijeniIspit = function(student,kolegij) {
  return `Student ${student.ime} ${student.prezime} je ${kolegij.prolaz(student)} iz kolegija ${kolegij.imeKolegija}.`
};
Profesor.prototype.izvjesce = function(){
  return `Ja sam profesor ${this.ime} ${this.prezime}. ${this.ispisKolegija()}.`
};
Profesor.prototype.ispisKolegija = function() {
  let ispis = this.listaKolegija.map(kolegij => (" " + kolegij.imeKolegija));
  if(ispis.length === 0){
    ispis = "trenutno ne predajem ni jedan kolegij"
  } else {
    ispis =  `Predajem${ispis}`
  }
  return ispis 
};

//klasa Kolegij

function Kolegij(imeKolegija, profesor){
  this.imeKolegija = imeKolegija;
  this.profesor = profesor;
  this.listaStudenata = [];
  this.listaStudenataPolozili = [];
};
Kolegij.prototype.upisiStudenta = function(student){
  this.listaStudenata.push(student);
};
Kolegij.prototype.polozio = function(student) {
  this.listaStudenataPolozili.push(student);
};
Kolegij.prototype.izvjesce = function() {
  return `Ime ovog kolegija je ${this.imeKolegija} predavač na ovom kolegiju je profesor ${this.profesor.ime}
  ${this.profesor.prezime} broj upisanih studenata u ovaj kolegij je ${this.listaStudenata.length}
  imena upisanih su ${this.listaStudenata}, imena onih koji su položili su: ${this.listaStudenataPolozili} `
};
Kolegij.prototype.prolaz = function(student){
  if(this.listaStudenataPolozili.includes(student)){
    return `uspješo položio ispit`
  } else {
    return "pao ispit"
  }
}


const sime = new Student("Šime", "Šimić");
const zvone = new Student ("Zvonimir", "Dražina");
const antun = new Profesor("Antun", "Nakić");
const ivan = new Profesor ("Ivan", "Ivić")
const react = new Kolegij("React", antun);
const javaScript = new Kolegij("JS", ivan);
const css = new Kolegij("CSS", antun)



sime.dodajKolegij(react);
sime.dodajKolegij(javaScript);
zvone.dodajKolegij(react);
zvone.dodajKolegij(javaScript);
zvone.dodajKolegij(css);
zvone.dodajPolozeniKolegij(css)//ovo samo njegov property da je ppoložio,trebamo staviti i u property od instance css-a tako da kad kad profa pozove funkciju polozio da vidi da je u toj listi

//console.log(zvone.izvjesce());

antun.listaKolegija = [react,css]; //dodajem na ovaj način iako nije baš dobro tako jer se direktno pristupa propertyu, bolje onako napraviti neku metodu za push ili sa set i get metodama
css.listaStudenata = [zvone,sime];
css.polozio(zvone)

//console.log(css.listaStudenataPolozili)
console.log(antun.izvjesce())
console.log()

console.log(css.izvjesce());//tu jos trebam dodti metode za ispis studenata unutar liste kao sto sam napravio i za profesora i studenta
                            // jer sad mi samo vraća [object, Object], ali nisam sad imao više vremena za to
console.log();
console.log(zvone.izvjesce());



console.log(antun.ocijeniIspit(zvone,css));
console.log(antun.ocijeniIspit(sime,css))









