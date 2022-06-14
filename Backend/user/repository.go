package user

import "database/sql"

// bikin kontrak untuk berhubungan dengan database
type Repository interface {
	FindUserByEmail(email string) (User, error)
	RoleUserById(id_user int) (string, error)
}

// bikin struct repository
type repository struct {
	db *sql.DB
}

// newrepsitory
func NewRepository(db *sql.DB) *repository {
	return &repository{db}
}

// function findsiswabyemail
func (r *repository) FindUserByEmail(email string) (User, error) {
	// inisiasi model user
	var user User

	// query find user by email
	sql := `
		SELECT * FROM users WHERE email = ?
	;`

	// exec query
	data := r.db.QueryRow(sql, email)

	// binding
	err := data.Scan(
		&user.Id_users,
		&user.Nama,
		&user.Role,
		&user.Email,
		&user.Password,
		&user.Avatar,
	)
	if err != nil {
		return user, err
	}

	// sukses
	return user, nil

}

// function find role user by id
func (r *repository) RoleUserById(id_user int) (string, error) {
	// query
	sql := `
		SELECT role FROM users
		WHERE id_users = ?
	;`
	// execute query
	data := r.db.QueryRow(sql, id_user)

	// variable penampung
	var role string

	// binding
	err := data.Scan(&role)
	if err != nil {
		return role, err
	}

	// sukses
	return role, nil

}