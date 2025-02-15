import { BiSolidHeartCircle, BiPlusCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../redux/session';
import './LikeButton.css';

export default function LikeButton({ songId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const likedSongIds = sessionUser ? sessionUser.likedSongIds : [];

  const handleClick = async songId => {
    if (!likedSongIds.includes(songId)) {
      await dispatch(sessionActions.thunkAddLikedSong(songId));
    } else {
      await dispatch(sessionActions.thunkRemoveLikedSong(songId));
    }
  };

  return (
    <>
      {sessionUser && (
        <span
          onClick={() => handleClick(songId)}
          className="like-button-container"
        >
          {likedSongIds.includes(songId) && (
            <BiSolidHeartCircle
              style={{ width: '100%', height: 'auto' }}
              className="like-button"
            />
          )}
          {!likedSongIds.includes(songId) && (
            <BiPlusCircle
              style={{ width: '100%', height: 'auto' }}
              className="like-button"
            />
          )}
        </span>
      )}
    </>
  );
}
