import api from '.';
import type { SetTracksPayload, GetTracksCriteriaResponse, Track } from '../../types/track';

export const trackEndpoints = {
    getTracks: (): Promise<{ data: Track[] }> => api.get('/tracks'),
    getTracksCriteria: (): Promise<{ data: GetTracksCriteriaResponse }> => api.get('rh/criteria/track-config/all'),
    setTracks: (payload: SetTracksPayload) => api.post('/criteria/track-config', payload),
};
