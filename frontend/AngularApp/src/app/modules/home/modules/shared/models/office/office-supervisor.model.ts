import { Gender } from './enum.model';

export class OfficeSupervisor {
    Id: string;
    Name: string;
    Role: string;
    Gender: Gender;
    Team: string;

    constructor(id: string, name: string, role: string, gender: Gender, team: string) {
        this.Id = id;
        this.Name = name;
        this.Role = role;
        this.Gender = gender;
        this.Team = team;
    }
}
