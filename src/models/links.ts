export interface ILinksPayload {
    url: string
}

export interface IDetailsPayload {
    link_id: string
}

export interface IDetailsResponse {
    link_id: string;
    visited_at: string;
    location: string;
    utm_source: string;
    id: string;
}
export interface ILinksApiModel {
    id: string,
    short_url: string,
    original_url: string,
}