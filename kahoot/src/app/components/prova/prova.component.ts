import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';
import { Respuesta } from 'src/app/models/respuesta.model';

@Component({
  selector: 'app-prova',
  templateUrl: './prova.component.html',
  styleUrls: ['./prova.component.css']
})
export class ProvaComponent implements OnInit {
  puntos
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    /*this.firebaseService.getPartides().subscribe( data => {
      console.log(data)
    })*/
    /*this.firebaseService.getPartida('partida1').subscribe( data => {
      console.log(data)
    })*/
    /*this.firebaseService.getRespuestasDePartida('partida1').subscribe( data => {
      console.log(data)
    })*/
    /*let respuesta = new Respuesta('pregunta2', 'respuesta3', 'usuario1')
    this.firebaseService.setAnswer('partida1', respuesta);*/
    /*this.firebaseService.join('partida1', 'Juanito')
    this.firebaseService.join('partida1', 'Pol')
    this.firebaseService.join('partida1', 'Martin')
    this.firebaseService.join('partida1', 'Ivan')*/
    //this.firebaseService.join('partida1', 'Juanito') 
    //this.firebaseService.changePoints('partida1','-LvH9k6kk-mN-rnFJ_2Z',1000);
    //this.firebaseService.unjoin('partida1', 'Juanito')
    //this.firebaseService.createPartida("PartidaGuay","partida_prova","set1")
    //this.firebaseService.getWinners('partida1')
    //this.firebaseService.getPartidaByCodi("PartidaGuay")
    /*this.firebaseService.getSetsQuestions().subscribe( (questions) => {
      console.log(questions)
    })*/
    //this.firebaseService.changeState('-LvS-zoTq6BU294WupnE','-1')
    
  }

}
