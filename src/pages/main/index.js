import React from 'react';
import { connect} from "react-redux";
import { bindActionCreators} from "redux";
import PropTypes from 'prop-types';

import { Creators as FavoriteActions } from '../../store/ducks/favorites';

class Main extends React.Component {
    state = {
        repositoryInput: ''
    };

    handleAddRepository = (e) => {
        e.preventDefault();
        this.props.addFavoriteRequest(this.state.repositoryInput);
        this.setState({ repositoryInput: '' });
    };

    handleInputChange = e => (
        this.setState({ repositoryInput: e.target.value })
    );

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleAddRepository}>
                    <input
                        type="text"
                        placeholder="usuário/repositório"
                        value={this.state.repositoryInput}
                        onChange={this.handleInputChange}
                    />
                    <button type="submit">Adicionar</button>

                    {this.props.loading && <span>Carregando ...</span>}
                    {this.props.error && <span>{this.props.error}</span>}
                </form>
                
                <ul>
                    {this.props.favorites.length > 0 && this.props.favorites.map(favorite => (
                        <li key={favorite.id}>
                            <p>
                                <strong>{favorite.name}</strong> ({favorite.description})
                            </p>
                            <a href={favorite.url}>Acessar</a>
                        </li>
                    ))}
                </ul>
            </React.Fragment>
        )
    }
}

Main.propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string
    })).isRequired,
    addFavoriteRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

const mapStateToProps = state => ({
    favorites: state.favorites.data,
    loading: state.favorites.loading,
    error: state.favorites.error
});

const mapDispatchToProps = dispatch => bindActionCreators(FavoriteActions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Main);