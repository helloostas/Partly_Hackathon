import axios from 'axios';

const API_BASE_URL = 'https://api.partly.com/api/v1/vehicles.search'; // Replace with actual base URL
const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5kZXY0LnBhcnRseS5wcm8vIiwic3ViIjoiMmJiOTJjNTktMGEzYi00MTViLThiMGMtMjkwODA0YjE2ZWU0IiwiaWF0IjoxNzUzNTYwNzEwLCJleHAiOjE3NTM2NjA4MDAsImp0aSI6ImFwaWtleTo2N2NhMzI5Yy05MTdjLTQyYTctODBjNy1lNDVjMDQyYjA1NWIiLCJhdXRob3JpemF0aW9uX2RldGFpbHMiOlt7Imlzc3VlciI6Ii9hcGkvdjEvcmVwYWlyZXJzLnZlcmlmeSIsInBhcmFtZXRlcnMiOnsicmVwYWlyZXJfaWQiOiIzYjUzMGMxYi0xY2M5LTRhNWEtYjVjMC0zMWVkYWFmZTBlZTMifSwiZGV0YWlscyI6eyJvcmdhbml6YXRpb25faWQiOiIwYmUwODYwNi01YjA5LTRmZjItYjhmNC1jZDk4NTNmYWU0NjMiLCJyZXBhaXJlcl9pZCI6IjNiNTMwYzFiLTFjYzktNGE1YS1iNWMwLTMxZWRhYWZlMGVlMyIsInNpdGVfaWRzIjpbXX19LHsiaXNzdWVyIjoiL2FwaS92MS9vcmdhbml6YXRpb25zLnZlcmlmeSIsInBhcmFtZXRlcnMiOnsib3JnYW5pemF0aW9uX2lkIjoiMGJlMDg2MDYtNWIwOS00ZmYyLWI4ZjQtY2Q5ODUzZmFlNDYzIn0sImRldGFpbHMiOnsiaWQiOiIwYmUwODYwNi01YjA5LTRmZjItYjhmNC1jZDk4NTNmYWU0NjMiLCJwZXJtaXNzaW9ucyI6W3sic2NvcGUiOiJvcmdhbml6YXRpb25fYWRtaW5zIiwiZW50aXR5IjoiMGJlMDg2MDYtNWIwOS00ZmYyLWI4ZjQtY2Q5ODUzZmFlNDYzIn0seyJzY29wZSI6ImJ1c2luZXNzX2FkbWlucyJ9XX19XX0.KifouEvuucUP4UeRht2Uj_2V7LA8O9D-1JSuQSVdGTlT1k3hMjIZIxM8vZQE9l13BREjIYCidRn9Mk0pKp_IUg';         // Replace with your actual token

export const searchVehicle = async (plateOrVin) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/vehicles.search`,
      { query: plateOrVin },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};