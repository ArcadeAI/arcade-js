import { Arcade } from '../src/index';

// Initialize the Arcade client
// (uses the ARCADE_API_KEY environment variable by default)
const arcade = new Arcade();

async function confirmUser() {
  try {
    // Get the flow ID from the query string
    const flow_id = 'flow_id';

    // Get the user ID from a session cookie or other secure storage
    const user_id = 'user_id';

    // Confirm the user
    const response = await arcade.userVerification.confirm(flow_id, user_id);

    console.log('User confirmed successfully!');
    console.log('Auth ID:', response.auth_id);

    if (response.next_uri) {
      console.log('Redirecting to:', response.next_uri);
      // In a real application, you would redirect the user:
      // window.location.href = response.next_uri;
    }
  } catch (error) {
    console.error('Failed to confirm user:', error);
  }
}
