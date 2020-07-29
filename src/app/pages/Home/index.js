import React, { useEffect, useState } from "react";
import PokedexLogo from "../../assets/images/Pokédex_logo.png";
import { pokemonDetailController } from "../../controllers/pokemonController";
import { NavLink } from "react-router-dom";
import { Paper, InputBase, IconButton, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBtn from "../../components/FavoriteBtn";
import Loader from "../../components/Loader";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
		margin: "20px",
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
}));

function Home() {
	const classes = useStyles();
	const [pokemonList, setPokemonList] = useState([]);
	const [offset, setOffset] = useState(0);
	const [searchInput, setSearchInput] = useState("");
	const [open, setOpen] = React.useState(false);
	const [page, setPage] = React.useState(1);

	useEffect(() => {
		getPokemonList(offset);
	}, []);

	async function getPokemonList(offset) {
		let newPokemonList = await getPokemonDetail(offset);
		setPokemonList([...newPokemonList]);
		window.scrollTo(0, 0);
	}

	async function getPokemonDetail(offset) {
		let newPokemonList = [];
		for (let i = 1; i <= 10; i++) {
			let result = await pokemonDetailController(i + offset);
			if (result !== false) {
				newPokemonList.push(result);
			}
		}
		return newPokemonList;
	}

	async function searchPokemon() {
		if (searchInput === "") {
			return;
		}
		const newPokemonList = await pokemonDetailController(
			searchInput.toLowerCase()
		);
		newPokemonList !== false
			? setPokemonList([newPokemonList])
			: setOpen(true);
	}

	function keyPress(e) {
		if (e.keyCode === 13) {
			searchPokemon();
		}
	}

	function handleChangePage(page) {
		setPage(page);
		const newOffset = page * 10 - 10;
		setOffset(newOffset);
		getPokemonList(newOffset);
	}

	const handleClose = (_event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	return (
		<div className={"container"}>
			<img
				alt={"PokedexLogo"}
				src={PokedexLogo}
				className={"detail-header__image"}
			/>
			<Paper className={classes.root}>
				<InputBase
					className={classes.input}
					placeholder="Search a pokemon by name ou id"
					value={searchInput}
					onChange={(event) => setSearchInput(event.target.value)}
					onKeyDown={(e) => keyPress(e)}
				/>
				<IconButton
					type="button"
					className={classes.iconButton}
					aria-label="search"
					onClick={() => searchPokemon()}
				>
					<SearchIcon />
				</IconButton>
			</Paper>
			{pokemonList.length !== 0 ? (
				<section className={"grid"}>
					{pokemonList.map((pokemon, count) => (
						<NavLink
							className={
								"grid-item " + pokemon.types[0].type.name
							}
							key={count}
							to={"detalhe/" + pokemon.id}
						>
							<h2 className={"grid-item__title"}>
								{pokemon.name}
							</h2>
							<div className={"item-separator"}>
								<div className={"grid-item__label-container"}>
									{pokemon.types.map((type) => (
										<label
											key={type.type.name}
											className={
												"grid-item__label " +
												type.type.name
											}
										>
											{type.type.name}
										</label>
									))}
								</div>
								<img
									alt={pokemon.name}
									className={"grid-item__image"}
									src={pokemon.sprites.front_default}
								/>
							</div>
						</NavLink>
					))}
				</section>
			) : (
				<Loader />
			)}

			<footer className={"pagination-container"}>
				<Pagination
					count={81}
					variant="outlined"
					showFirstButton
					showLastButton
					page={page}
					size={"large"}
					color={"primary"}
					onChange={(_e, page) => handleChangePage(page)}
				/>
			</footer>

			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<MuiAlert
					elevation={6}
					variant="filled"
					onClose={handleClose}
					severity="error"
				>
					Pokemon não encontrado, tente novamente!
				</MuiAlert>
			</Snackbar>
			<FavoriteBtn />
		</div>
	);
}

export default Home;
