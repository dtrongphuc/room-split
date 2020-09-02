import React, { useState, useEffect } from "react";
import { authService } from "../services/auth.service";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
	const [isAuth, setIsAuth] = useState(false);
	const [loading, setLoading] = useState(true);

	const getIsAuth = () => {
		authService
			.isAuth()
			.then(() => {
				setIsAuth(true);
			})
			.catch(() => setIsAuth(false))
			.then(() => setLoading(false));
	};

	useEffect(() => {
		getIsAuth();
	}, []);

	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth, loading }}>
			{props.children}
		</AuthContext.Provider>
	);
};
