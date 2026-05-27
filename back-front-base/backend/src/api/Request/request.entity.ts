export interface Request1 {
  id?: string;
  dataInizio: Date;
  dataFine: Date;
  categoriaId: string;// FK categoria
  stato: 'In attesa' | 'Approvato' | 'Rifiutato';
  dataValutazione?: Date;
  motivazione?: string; 
  role1ID: string;// FK role1 dipendente che ha fatto la richiesta
  role2ID?: string;// FK role2  responsbaile della valutazione
}
