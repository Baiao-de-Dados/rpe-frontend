import { useState } from "react";

import type { Collaborator } from "../../types/leadership";

import { mockLeadershipData } from "../../data/mockLeadershipData";

import { useLeadershipMetrics } from "../../hooks/useLeadershipMetrics";

import PageHeader from "../../components/common/PageHeader";
import { LeadershipMetrics } from "../../components/Dashboard/LeadershipMetrics";
import LeadershipManagement from "../../components/Lideranca/LeadershipManagement";

export function Lideranca() {

    const originalCollaborators = mockLeadershipData.collaborators;
    const [collaborators, setCollaborators] = useState<Collaborator[]>(originalCollaborators);
    
    const metrics = useLeadershipMetrics(originalCollaborators, mockLeadershipData.leaders);

    const handleCollaboratorAssignmentChange = (updatedCollaborators: Collaborator[]) => {
        setCollaborators(updatedCollaborators);
    };

    return (
        <>
            <PageHeader title="Painel de Liderança" />
            <main className="p-8 pt-6">
                <LeadershipMetrics
                    totalLeaders={metrics.totalLeaders}
                    completionPercentage={metrics.completionPercentage}
                    collaboratorsWithoutLeader={metrics.collaboratorsWithoutLeader}
                    totalCollaborators={metrics.totalCollaborators}
                />
                <LeadershipManagement
                    leaders={mockLeadershipData.leaders}
                    collaborators={collaborators}
                    onCollaboratorAssignmentChange={handleCollaboratorAssignmentChange}
                />
            </main>
        </>
    );
}
