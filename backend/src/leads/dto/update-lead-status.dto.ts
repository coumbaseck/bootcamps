import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateLeadStatusDto {
  @IsNotEmpty()
  @IsIn(['nouveau', 'contacté', 'rejeté']) // tu peux ajouter d'autres statuts ici si besoin
  status: string;
}
