import { useEffect, useState } from 'react';
import { fetchAptosGraduacao } from '../services/home/home';
import type { AptoGraduacao } from '../services/home/types/types';

export function useAptosGraduacao(token?: string) {
    const [aptos, setAptos] = useState<AptoGraduacao[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        if (!token) return;

        async function load() {
            try {
                const data = await fetchAptosGraduacao(token);
                setAptos(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [token]);

    return { aptos, loading, error };
}
