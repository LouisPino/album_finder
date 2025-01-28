import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, isLoading } = useAuth0();
  return(
    <>
      <h2>Not so kind after all</h2>
      </>
    )
}
