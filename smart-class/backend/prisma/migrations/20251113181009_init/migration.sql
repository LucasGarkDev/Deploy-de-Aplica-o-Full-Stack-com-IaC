-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "turma" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aluno" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "turmaId" INTEGER NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "turmaId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "grupo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chamada" (
    "id" SERIAL NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "quantidadeAulas" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'ATIVA',
    "turmaId" INTEGER NOT NULL,

    CONSTRAINT "chamada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "presenca" (
    "id" SERIAL NOT NULL,
    "presente" BOOLEAN NOT NULL DEFAULT false,
    "alunoId" INTEGER NOT NULL,
    "chamadaId" INTEGER NOT NULL,

    CONSTRAINT "presenca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AlunosGrupos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AlunosGrupos_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "_AlunosGrupos_B_index" ON "_AlunosGrupos"("B");

-- AddForeignKey
ALTER TABLE "turma" ADD CONSTRAINT "turma_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno" ADD CONSTRAINT "aluno_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupo" ADD CONSTRAINT "grupo_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chamada" ADD CONSTRAINT "chamada_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presenca" ADD CONSTRAINT "presenca_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presenca" ADD CONSTRAINT "presenca_chamadaId_fkey" FOREIGN KEY ("chamadaId") REFERENCES "chamada"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlunosGrupos" ADD CONSTRAINT "_AlunosGrupos_A_fkey" FOREIGN KEY ("A") REFERENCES "aluno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlunosGrupos" ADD CONSTRAINT "_AlunosGrupos_B_fkey" FOREIGN KEY ("B") REFERENCES "grupo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
