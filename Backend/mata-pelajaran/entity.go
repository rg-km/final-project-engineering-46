package matapelajaran

import (
	"time"

	"github.com/google/uuid"
)

// struct model dari table mata_pelajaran
type MataPelajaran struct {
	IdMataPelajaran int
	MataPelajaran   string
	Token           uuid.UUID
	KKM             int
	Durasi          int
	Deadline        time.Time
}
