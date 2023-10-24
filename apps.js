<h2>Player Management</h2>

<!-- Add Player Form -->
<form (ngSubmit)="addPlayer()">
  <label for="name">Name:</label>
  <input type="text" id="name" [(ngModel)]="newPlayer.name" required>

  <!-- Add more input fields for other player properties -->

  <button type="submit">Add Player</button>
</form>

<!-- Update Player Form -->
<form (ngSubmit)="updatePlayer()">
  <label for="updateId">Player ID:</label>
  <input type="number" id="updateId" [(ngModel)]="updatePlayerId" required>

  <!-- Add input fields for updating player properties -->

  <button type="submit">Update Player</button>
</form>

<!-- Delete Player Form -->
<form (ngSubmit)="deletePlayer()">
  <label for="deleteId">Player ID:</label>
  <input type="number" id="deleteId" [(ngModel)]="deletePlayerId" required>

  <button type="submit">Delete Player</button>
</form>

<!-- Perform Queries -->
<button (click)="performQueries()">Perform Queries</button>

<!-- Display Results -->
<div *ngIf="results">
  <h3>Query Results:</h3>
  <ul>
    <li *ngFor="let result of results">{{ result }}</li>
  </ul>
</div>
In the player-management.component.ts file, add the following code:
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player-management',
  templateUrl: './player-management.component.html',
  styleUrls: ['./player-management.component.css']
})
export class PlayerManagementComponent {
  newPlayer: any = {};
  updatePlayerId: number;
  deletePlayerId: number;
  results: any[];

  constructor(private http: HttpClient) {}

  addPlayer() {
    this.http.post<any>('your-backend-api-url/players', this.newPlayer)
      .subscribe(() => {
        alert('Player added successfully!');
        this.newPlayer = {};
      }, error => {
        console.log(error);
        alert('Failed to add player. Please try again.');
      });
  }

  updatePlayer() {
    this.http.put<any>(`your-backend-api-url/players/${this.updatePlayerId}`, /* Updated player object */)
      .subscribe(() => {
        alert('Player updated successfully!');
        this.updatePlayerId = null;
      }, error => {
        console.log(error);
        alert('Failed to update player. Please try again.');
      });
  }

  deletePlayer() {
    this.http.delete<any>(`your-backend-api-url/players/${this.deletePlayerId}`)
      .subscribe(() => {
        alert('Player deleted successfully!');
        this.deletePlayerId = null;
      }, error => {
        console.log(error);
        alert('Failed to delete player. Please try again.');
      });
  }

  performQueries() {
    this.http.get<any[]>('your-backend-api-url/queries')
      .subscribe(data => {
        this.results = data;
      }, error => {
        console.log(error);
        alert('Failed to perform queries. Please try again.');
      });
  }
}
