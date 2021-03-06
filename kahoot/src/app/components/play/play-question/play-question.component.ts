import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/models/pregunta.model';
import { GameService } from 'src/app/services/game.service';
import { FirebaseService } from 'src/app/services/firebaseService/firebase-service.service';
import { Partida } from 'src/app/models/partida.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Respuesta } from 'src/app/models/respuesta.model';

@Component({
  selector: 'app-play-question',
  templateUrl: './play-question.component.html',
  styles: []
})
export class PlayQuestionComponent implements OnInit {

  //ATributs per les vistes
  haRespondido = false;

  //Atributs de partida
  partida: Partida;
  id_partida:string;
  pregunta_seleccionada:string;
  acertado:boolean = false;
  pregunta: Pregunta;
  name: string;
  answers_count:number = 0;
  time:number = 60;
  timer;

  constructor(
    private game: GameService,
    private realtime: FirebaseService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.name = this.game.nomUsuari;
    this.id_partida = this.route.snapshot.paramMap.get("id");
    
    this.fetchPartida(); //ja activa el timer
        
  }
    
  public responder(p:string){
    this.pregunta_seleccionada = p;
    this.haRespondido = true;
    clearInterval(this.timer);
    this.time = 0;
    this.realtime.setAnswer(this.game.idPartida, new Respuesta(this.game.pregunta_seleccionada, p, this.game.refUsuari)); 
    if(p==this.pregunta.respuesta_correcta){
      this.game.punts += 10;
      this.realtime.changePoints(this.id_partida,this.game.refUsuari,this.game.punts)
      this.acertado = true
    }
    else {
      this.acertado = false;
    }
  }

  public startQuestion() {
    this.haRespondido = false;
    this.acertado = false;
    this.pregunta_seleccionada = null;
    this.startTimer();
  }
  
  private startTimer() {
    //Timer
    this.time = 60;
    this.timer = setInterval(() => {
      if(this.time <= 0) {
        clearInterval(this.timer);
        this.acertado = false;
        this.haRespondido = true;
      }
      else this.time--;
    }, 1000);
  }

  private fetchPartida() {
    //Obtenim partida
    this.realtime.getPartida(this.id_partida).subscribe(
      p => {
        this.checkState(p)
        this.partida = p;
        
        //Obtenim answer_count
        this.getAnswerCount();
        
      }
    );
  }

  private checkState(p:Partida){
    if(p.estado=='-2'){
      this.router.navigateByUrl(`/play/${this.id_partida}/finish`);
    }
    else if(p.estado=='-1') {
      this.router.navigateByUrl(`/play/${this.id_partida}`);
    }
    else if(!this.partida || this.partida.estado!=p.estado){
      
      this.realtime.getSetQuestions(p.preguntas).subscribe( //Obtenim la següent pregunta...
        data => {
          this.game.preguntes = data;
          this.pregunta = data[p.estado];
          this.startQuestion();
        }
      );
    }
  }


  private getAnswerCount() {
    let i = 0;
    if(this.partida!=null && this.partida.respuestas != null) {
      this.partida.respuestas.forEach((respuesta) => {
        if(respuesta.pregunta == this.game.pregunta_seleccionada) //si la resposta es de la pregunta d'ara
          i++;
      });
      this.answers_count = i;
    }
    else this.answers_count = 0; 
  }

}
