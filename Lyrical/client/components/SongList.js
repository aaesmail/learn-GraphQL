import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import gql from 'graphql-tag';

import query from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({
        variables: {
          id,
        },
      })
      .then(() => this.props.data.refetch());
  }

  renderSongs(songs) {
    return (
      <ul className='collection'>
        {songs.map(({ id, title }) => (
          <li key={id} className='collection-item'>
            <Link to={`/songs/${id}`}>{title}</Link>
            <i className='material-icons' onClick={() => this.onSongDelete(id)}>
              delete
            </i>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        {this.props.data.loading
          ? 'Loading...'
          : this.renderSongs(this.props.data.songs)}
        <Link to='/songs/new' className='btn-floating btn-large red right'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
