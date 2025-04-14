import { API_BASE_URL } from "@/shared/config/api";
import type { Session, SessionDetails } from "../model/types";
import type { FilterState } from "@/features/filters/model/store";

export const fetchSessions = async (
  filters?: Partial<FilterState>
): Promise<Session[]> => {
  const basePath = `${API_BASE_URL}/sessions`;
  const params = new URLSearchParams();

  if (filters) {
    if (filters.selectedAgeRatings && filters.selectedAgeRatings.length > 0) {
      filters.selectedAgeRatings.forEach((rating) => {
        params.append("ageRating", String(rating));
      });
    }
    if (filters.searchTerm && filters.searchTerm.trim() !== "") {
      params.append("movieTitle", filters.searchTerm.trim());
    }
    if (filters.dateRange?.start) {
      params.append("dateFrom", filters.dateRange.start);
    }
    if (filters.dateRange?.end) {
      params.append("dateTo", filters.dateRange.end);
    }
    if (filters.selectedGenres && filters.selectedGenres.length > 0) {
      filters.selectedGenres.forEach((genre) => {
        params.append("genres", genre);
      });
    }
  }

  const urlString = `${basePath}?${params.toString()}`;

  try {
    const response = await fetch(urlString, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data: Session[] = await response.json();

    let filteredData = data;
    if (
      filters?.selectedGenres &&
      filters.selectedGenres.length > 0 &&
      !params.has("genres")
    ) {
      const selectedGenresSet = new Set(filters.selectedGenres);
      filteredData = filteredData.filter((session) =>
        session.genres.some((genre) => selectedGenresSet.has(genre))
      );
    }

    return filteredData;
  } catch (error) {
    console.error("Failed to fetch sessions:", error);
    throw error;
  }
};

export const fetchSessionDetailsById = async (
  sessionId: string
): Promise<SessionDetails | null> => {
  const urlString = `${API_BASE_URL}/sessions/${sessionId}`;

  try {
    const response = await fetch(urlString, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data: SessionDetails = await response.json();

    if (!data || Object.keys(data).length === 0) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(
      `Failed to fetch session details for ID ${sessionId}:`,
      error
    );
    throw error;
  }
};
