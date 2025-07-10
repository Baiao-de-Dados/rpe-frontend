import PageHeader from "../../components/common/PageHeader";
import ImportarHistoricoCard from "../../components/Importar/ImportarHistoricoCard";

export function ImportarHistoricos() {
    return (
        <>
            <PageHeader title="Importar Histórico" />
            <main className="p-8 pt-6">
                <ImportarHistoricoCard />
            </main>
        </>
    );
}
