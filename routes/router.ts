import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/sockets';
import Email from '../model/email';

const email = new Email();

import {html} from '../static/index.html';

export const router = Router();
router.get('/', (_req: Request, res: Response) => {
    console.log('Pagina Inicial');
    res.send(html);
});

router.get('/email', (_req: Request, res: Response) => {
    console.log('Pagina email');
    email.obtener()
    .then(email => {
        console.log('email ', email);
        res.json({
            ok: true,
            body : {
                email
            }
        })
        // res.send('email Page', {email : email});
    })
    .catch(err => {
        return res.status(500).send('Error en el servidor');
    })
});

router.get('/mensajes', (_req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien'
    });
});

router.post('/mensajes', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = { de, cuerpo };

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    };

    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado', payload)

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

router.get('/usuarios', (_req: Request, res: Response) => {
    const server = Server.instance;
    server.io.clients((err: any, clientes: string[]) => {
        if(err) {
            return res.json({ ok: false, err });
        }
        res.json({ ok: true, clientes });
    })
});

router.get('/usuarios/detalle', (_req: Request, res: Response) => {
    res.json({ ok: true, clientes: usuariosConectados.getLista() });
});