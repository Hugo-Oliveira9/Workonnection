const API_URL = "http://localhost:3000";

export async function apiPost<T>(url: string, body: unknown): Promise<T> {
    const response = await fetch(`${API_URL}${url}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.message || "Erro na requisição");
    }

    return data;
}