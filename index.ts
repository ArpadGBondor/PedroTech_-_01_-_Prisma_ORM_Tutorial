import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/createManyCars', async (req: Request, res: Response) => {
    const { carList } = req.body;
    // createMany is not supported for sqlite
    //     const newUsers = await prisma.car.createMany({
    //         data: carList,
    //     });
    const newCars = [];
    for (const { model, year, userId } of carList) {
        newCars.push(
            await prisma.car.create({
                data: {
                    model,
                    year,
                    userId,
                },
            })
        );
    }
    res.json(newCars);
});

// Create a single user
app.post('/', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const newUser = await prisma.user.create({
        data: {
            username,
            password,
        },
    });
    res.json(newUser);
});

// Create many users
app.post('/createMany', async (req: Request, res: Response) => {
    const { userList } = req.body;
    // createMany is not supported for sqlite
    //     const newUsers = await prisma.user.createMany({
    //         data: userList,
    //     });
    const newUsers = [];
    for (const { username, password } of userList) {
        newUsers.push(
            await prisma.user.create({
                data: {
                    username,
                    password,
                },
            })
        );
    }
    res.json(newUsers);
});

// Get all
app.get('/', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({ include: { cars: true } });
    res.json(users);
});

// Get single
app.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ include: { cars: true }, where: { id: Number(id) } });
    res.json(user);
});

// Update
app.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username } = req.body;
    const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { username: username },
    });
    res.json(updatedUser);
});

// Delete
app.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedUser = await prisma.user.delete({
        where: {
            id: Number(id),
        },
    });
    res.json(deletedUser);
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
