import { Funcionario } from "../models/Funcionario.js";
import { EPI } from "../models/EPI.js";
import { Movimentacao } from "../models/movimentacao.js";

const cadastrarEPI = async (req, res) => {
    try {
        const { nome, tipo, qualidade } = req.body
        if (!nome || !tipo || !qualidade) {
            return res.status(404).send({ mensagem: 'Favor informar nome, tipo e qualidade' })
        }
        const epi = await EPI.create({ nome, tipo, qualidade })
        res.status(201).send({ epi })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

const editarEPI = async (req, res) => {
    try {
        const id = req.params.id
        const { nome, tipo, qualidade } = req.body
        const resultado = await EPI.update({ nome, tipo, qualidade }, { where: { id } })
        res.status(200).send({ mensagem: resultado })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

const deletarEPI = async (req, res) => {
    try {
        const id = req.params.id
        await EPI.destroy({ where: { id } })
        res.status(200).send({ mensagem: 'EPI apagado com sucesso' })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}


const listarEPI = async (req, res) => {
    try {
        const resultado = await EPI.findAll()
        res.status(200).send({ mensagem: resultado })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////

const cadastrarFun = async (req, res) => {
    try {
        const { nome, cpf, setor } = req.body
        if (!nome || !cpf || !setor) {
            // Faltam dados
            return res.status(404).send({ mensagem: 'Favor informar nome, cpf e setor' })
        }
        const funcionario = await Funcionario.create({ nome, cpf, setor })
        res.status(201).send({ funcionario })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

const editarFun = async (req, res) => {
    try {
        const id = req.params.id
        const { nome, cpf, setor } = req.body
        const resultado = await Funcionario.update({ nome, cpf, setor }, { where: { id } })
        res.status(200).send({ mensagem: resultado })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

const deletarFun = async (req, res) => {
    try {
        const id = req.params.id
        await Funcionario.destroy({ where: { id } })
        res.status(200).send({ mensagem: 'Funcionario apagado com sucesso' })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

const listarFun = async (req, res) => {
    try {
        const resultado = await Funcionario.findAll()
        res.status(200).send({ mensagem: resultado })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}


/////////////////////////////////////////////////////////////////////


const cadastrarMovimentacao = async (req, res) => {
    try {
        const { funcionarioId, epiId, quantidade, tipo } = req.body;
        if (!funcionarioId || !epiId || !quantidade || !tipo) {
            // Faltam dados
            return res.status(404).send({ mensagem: 'Favor informar todos os dados: funcionarioId, epiId, quantidade e tipo' });
        }

        const movimentacao = await Movimentacao.create({
            funcionarioId,
            epiId,
            quantidade,
            tipo
        });
        res.status(201).send({ movimentacao });
    } catch (erro) {
        console.log(erro);
        res.status(500).send({ mensagem: 'Erro interno' });
    }
};

const listarMovimentacao = async (req, res) => {
    try {
        const movimentacoes = await Movimentacao.findAll({
            include: [Funcionario, EPI]
        });
        res.status(200).send({ movimentacoes });
    } catch (erro) {
        console.log(erro);
        res.status(500).send({ mensagem: 'Erro interno' });
    }
};
const editarMovimentacao = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade, tipo } = req.body;

        const movimentacao = await Movimentacao.findByPk(id);
        if (!movimentacao) {
            return res.status(404).send({ mensagem: 'Movimentação não encontrada' });
        }

        movimentacao.quantidade = quantidade || movimentacao.quantidade;
        movimentacao.tipo = tipo || movimentacao.tipo;
        await movimentacao.save();

        res.status(200).send({ movimentacao });
    } catch (erro) {
        console.log(erro);
        res.status(500).send({ mensagem: 'Erro interno' });
    }
};

const deletarMovimentacao = async (req, res) => {
    try {
        const { id } = req.params;

        const movimentacao = await Movimentacao.findByPk(id);
        if (!movimentacao) {
            return res.status(404).send({ mensagem: 'Movimentação não encontrada' });
        }

        await movimentacao.destroy();
        res.status(200).send({ mensagem: 'Movimentação apagada com sucesso' });
    } catch (erro) {
        console.log(erro);
        res.status(500).send({ mensagem: 'Erro interno' });
    }
};


export { cadastrarEPI, editarEPI, deletarEPI, cadastrarFun, editarFun, deletarFun, listarFun, listarEPI, cadastrarMovimentacao, listarMovimentacao, editarMovimentacao, deletarMovimentacao }