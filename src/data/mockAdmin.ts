export const mockERP = {
    users: [
        {
            email: "maria@rocket.com",
            name: "Maria Silva",
            track: "Backend",
            primaryRole: "COLLABORATOR",
            position: "Dev Senior",
            mentorEmail: "joao@rocket.com"
        },
        {
            email: "joao@rocket.com",
            name: "João Souza",
            track: "DevOps",
            primaryRole: "LEADER",
            position: "Tech Lead",
            mentorEmail: "ana@rocket.com"
        },
        {
            email: "ana@rocket.com",
            name: "Ana Costa",
            track: "Project Management",
            primaryRole: "MANAGER",
            position: "Project Manager",
            mentorEmail: "carlos@rocket.com"
        },
        {
            email: "carlos@rocket.com",
            name: "Carlos Pereira",
            track: "Frontend",
            primaryRole: "COLLABORATOR",
            position: "UI Engineer",
            mentorEmail: "joao@rocket.com"
        },
        {
            email: "lucas@rocket.com",
            name: "Lucas Lima",
            track: "Backend",
            primaryRole: "COLLABORATOR",
            position: "Dev Pleno",
            mentorEmail: "maria@rocket.com"
        },
        {
            email: "fernanda@rocket.com",
            name: "Fernanda Alves",
            track: "Frontend",
            primaryRole: "COLLABORATOR",
            position: "Dev Junior",
            mentorEmail: "carlos@rocket.com"
        },
        {
            email: "roberto@rocket.com",
            name: "Roberto Dias",
            track: "DevOps",
            primaryRole: "LEADER",
            position: "DevOps Engineer",
            mentorEmail: "joao@rocket.com"
        },
        {
            email: "juliana@rocket.com",
            name: "Juliana Prado",
            track: "Project Management",
            primaryRole: "MANAGER",
            position: "Project Manager",
            mentorEmail: "ana@rocket.com"
        },
        {
            email: "paulo@rocket.com",
            name: "Paulo Mendes",
            track: "Backend",
            primaryRole: "COLLABORATOR",
            position: "Dev Senior",
            mentorEmail: "lucas@rocket.com"
        },
        {
            email: "aline@rocket.com",
            name: "Aline Souza",
            track: "Frontend",
            primaryRole: "COLLABORATOR",
            position: "UI Designer",
            mentorEmail: "fernanda@rocket.com"
        },
        {
            email: "marcos@rocket.com",
            name: "Marcos Silva",
            track: "DevOps",
            primaryRole: "LEADER",
            position: "DevOps Engineer",
            mentorEmail: "roberto@rocket.com"
        },
        {
            email: "patricia@rocket.com",
            name: "Patricia Gomes",
            track: "Project Management",
            primaryRole: "MANAGER",
            position: "Project Manager",
            mentorEmail: "juliana@rocket.com"
        },
        {
            email: "daniel@rocket.com",
            name: "Daniel Costa",
            track: "Backend",
            primaryRole: "COLLABORATOR",
            position: "Dev Pleno",
            mentorEmail: "paulo@rocket.com"
        },
        {
            email: "sandra@rocket.com",
            name: "Sandra Lima",
            track: "Frontend",
            primaryRole: "COLLABORATOR",
            position: "Dev Junior",
            mentorEmail: "aline@rocket.com"
        },
        {
            email: "ricardo@rocket.com",
            name: "Ricardo Alves",
            track: "DevOps",
            primaryRole: "LEADER",
            position: "DevOps Engineer",
            mentorEmail: "marcos@rocket.com"
        },
        {
            email: "beatriz@rocket.com",
            name: "Beatriz Prado",
            track: "Project Management",
            primaryRole: "MANAGER",
            position: "Project Manager",
            mentorEmail: "patricia@rocket.com"
        },
        {
            email: "thiago@rocket.com",
            name: "Thiago Mendes",
            track: "Backend",
            primaryRole: "COLLABORATOR",
            position: "Dev Senior",
            mentorEmail: "daniel@rocket.com"
        },
        {
            email: "carla@rocket.com",
            name: "Carla Souza",
            track: "Frontend",
            primaryRole: "COLLABORATOR",
            position: "UI Designer",
            mentorEmail: "sandra@rocket.com"
        },
        {
            email: "gustavo@rocket.com",
            name: "Gustavo Silva",
            track: "DevOps",
            primaryRole: "LEADER",
            position: "DevOps Engineer",
            mentorEmail: "ricardo@rocket.com"
        },
        {
            email: "marina@rocket.com",
            name: "Marina Gomes",
            track: "Project Management",
            primaryRole: "MANAGER",
            position: "Project Manager",
            mentorEmail: "beatriz@rocket.com"
        },
        {
            email: "felipe@rocket.com",
            name: "Felipe Costa",
            track: "Backend",
            primaryRole: "COLLABORATOR",
            position: "Dev Pleno",
            mentorEmail: "thiago@rocket.com"
        },
        {
            email: "priscila@rocket.com",
            name: "Priscila Lima",
            track: "Frontend",
            primaryRole: "COLLABORATOR",
            position: "Dev Junior",
            mentorEmail: "carla@rocket.com"
        }
    ],
    projects: [
        {
            name: "Alpha",
            manager: {
                email: "ana@rocket.com",
                startDate: "2025-06-01T08:00:00.000Z",
                endDate: null
            },
            leaders: [
                { email: "joao@rocket.com", startDate: "2025-06-05T09:30:00.000Z", endDate: null },
                { email: "roberto@rocket.com", startDate: "2025-06-06T09:30:00.000Z", endDate: null },
                { email: "marcos@rocket.com", startDate: "2025-06-07T09:30:00.000Z", endDate: null },
                { email: "ricardo@rocket.com", startDate: "2025-06-08T09:30:00.000Z", endDate: null }
            ],
            collaborators: [
                { email: "maria@rocket.com", startDate: "2025-06-10T10:15:00.000Z", endDate: null },
                { email: "carlos@rocket.com", startDate: "2025-06-12T11:00:00.000Z", endDate: "2025-07-01T17:00:00.000Z" },
                { email: "lucas@rocket.com", startDate: "2025-06-13T11:00:00.000Z", endDate: null },
                { email: "fernanda@rocket.com", startDate: "2025-06-14T11:00:00.000Z", endDate: null },
                { email: "aline@rocket.com", startDate: "2025-06-15T11:00:00.000Z", endDate: null },
                { email: "aline@rocket.com", startDate: "2025-06-15T11:00:00.000Z", endDate: null },
                { email: "aline@rocket.com", startDate: "2025-06-15T11:00:00.000Z", endDate: null }
            ]
        },
        {
            name: "Beta",
            manager: {
                email: "carlos@rocket.com",
                startDate: "2025-05-15T14:00:00.000Z",
                endDate: "2025-06-30T18:00:00.000Z"
            },
            leaders: [
                { email: "roberto@rocket.com", startDate: "2025-05-16T09:30:00.000Z", endDate: null },
                { email: "marcos@rocket.com", startDate: "2025-05-17T09:30:00.000Z", endDate: null },
                { email: "gustavo@rocket.com", startDate: "2025-05-18T09:30:00.000Z", endDate: null }
            ],
            collaborators: [
                { email: "ana@rocket.com", startDate: "2025-05-20T09:00:00.000Z", endDate: "2025-06-30T18:00:00.000Z" },
                { email: "paulo@rocket.com", startDate: "2025-05-21T11:00:00.000Z", endDate: null },
                { email: "daniel@rocket.com", startDate: "2025-05-22T11:00:00.000Z", endDate: null },
                { email: "sandra@rocket.com", startDate: "2025-05-23T11:00:00.000Z", endDate: null }
            ]
        },
        {
            name: "Gama",
            manager: {
                email: "lucas@rocket.com",
                startDate: "2025-07-01T09:00:00.000Z",
                endDate: null
            },
            leaders: [
                { email: "fernanda@rocket.com", startDate: "2025-07-02T10:00:00.000Z", endDate: null },
                { email: "beatriz@rocket.com", startDate: "2025-07-03T10:00:00.000Z", endDate: null },
                { email: "patricia@rocket.com", startDate: "2025-07-04T10:00:00.000Z", endDate: null }
            ],
            collaborators: [
                { email: "roberto@rocket.com", startDate: "2025-07-03T11:00:00.000Z", endDate: null },
                { email: "juliana@rocket.com", startDate: "2025-07-04T11:00:00.000Z", endDate: null },
                { email: "aline@rocket.com", startDate: "2025-07-05T11:00:00.000Z", endDate: null },
                { email: "marcos@rocket.com", startDate: "2025-07-06T11:00:00.000Z", endDate: null }
            ]
        },
        {
            name: "Delta",
            manager: {
                email: "juliana@rocket.com",
                startDate: "2025-07-04T09:00:00.000Z",
                endDate: null
            },
            leaders: [],
            collaborators: [
                {
                    email: "paulo@rocket.com",
                    startDate: "2025-07-05T10:00:00.000Z",
                    endDate: null
                }
            ]
        },
        {
            name: "Epsilon",
            manager: {
                email: "aline@rocket.com",
                startDate: "2025-07-06T09:00:00.000Z",
                endDate: null
            },
            leaders: [
                {
                    email: "marcos@rocket.com",
                    startDate: "2025-07-07T10:00:00.000Z",
                    endDate: null
                }
            ],
            collaborators: [
                {
                    email: "patricia@rocket.com",
                    startDate: "2025-07-08T11:00:00.000Z",
                    endDate: null
                }
            ]
        },
        {
            name: "Zeta",
            manager: {
                email: "daniel@rocket.com",
                startDate: "2025-07-09T09:00:00.000Z",
                endDate: null
            },
            leaders: [],
            collaborators: [
                {
                    email: "sandra@rocket.com",
                    startDate: "2025-07-10T10:00:00.000Z",
                    endDate: null
                }
            ]
        },
        {
            name: "Eta",
            manager: {
                email: "ricardo@rocket.com",
                startDate: "2025-07-11T09:00:00.000Z",
                endDate: null
            },
            leaders: [
                {
                    email: "beatriz@rocket.com",
                    startDate: "2025-07-12T10:00:00.000Z",
                    endDate: null
                }
            ],
            collaborators: [
                {
                    email: "thiago@rocket.com",
                    startDate: "2025-07-13T11:00:00.000Z",
                    endDate: null
                }
            ]
        },
        {
            name: "Theta",
            manager: {
                email: "carla@rocket.com",
                startDate: "2025-07-14T09:00:00.000Z",
                endDate: null
            },
            leaders: [],
            collaborators: [
                {
                    email: "gustavo@rocket.com",
                    startDate: "2025-07-15T10:00:00.000Z",
                    endDate: null
                }
            ]
        },
        {
            name: "Iota",
            manager: {
                email: "marina@rocket.com",
                startDate: "2025-07-16T09:00:00.000Z",
                endDate: null
            },
            leaders: [
                {
                    email: "felipe@rocket.com",
                    startDate: "2025-07-17T10:00:00.000Z",
                    endDate: null
                }
            ],
            collaborators: [
                {
                    email: "priscila@rocket.com",
                    startDate: "2025-07-18T11:00:00.000Z",
                    endDate: null
                }
            ]
        },
        {
            name: "Kappa",
            manager: {
                email: "maria@rocket.com",
                startDate: "2025-07-19T09:00:00.000Z",
                endDate: null
            },
            leaders: [],
            collaborators: [
                {
                    email: "joao@rocket.com",
                    startDate: "2025-07-20T10:00:00.000Z",
                    endDate: null
                }
            ]
        },
        {
            name: "Lambda",
            manager: {
                email: "ana@rocket.com",
                startDate: "2025-07-21T09:00:00.000Z",
                endDate: null
            },
            leaders: [
                {
                    email: "carlos@rocket.com",
                    startDate: "2025-07-22T10:00:00.000Z",
                    endDate: null
                }
            ],
            collaborators: [
                {
                    email: "lucas@rocket.com",
                    startDate: "2025-07-23T11:00:00.000Z",
                    endDate: null
                }
            ]
        }
    ]
};

export interface UserExtra {
    email: string;
    name: string;
    position?: string;
    track?: string;
    primaryRole?: string;
}
export interface ProjectPerson {
    email: string;
    startDate: string;
    endDate?: string | null;
}
export interface ProjectType {
    name: string;
    manager: ProjectPerson;
    leaders: ProjectPerson[];
    collaborators: ProjectPerson[];
}