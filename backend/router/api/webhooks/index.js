const express = require('express');
const userModel = require('../../../model/user.model');
const { apiResponse } = require('../../../helper/apiResponse');
const router = express.Router();

router.post('/clerk', async (req, res) => {
    try {
        const event = req.body;

        console.log("Webhook:", event.type);


        if (event.type === 'user.created') {
            const userData = event.data;

            const existingUser = await userModel.findOne({
                clerkUserId: userData.id
            });

            if (!existingUser) {
                const newUser = await userModel.create({
                    fullName: `${userData.first_name || ''} ${userData.last_name || ''}`,
                    email: userData.email_addresses?.[0]?.email_address,
                    image: userData.image_url,
                    clerkUserId: userData.id
                });

                return apiResponse(res, 200, "User created", newUser);
            }

            return apiResponse(res, 200, "User already exists", existingUser);
        }

        if (event.type === 'user.updated') {
            const userData = event.data;

            const updatedUser = await userModel.findOneAndUpdate(
                { clerkUserId: userData.id },
                {
                    fullName: `${userData.first_name || ''} ${userData.last_name || ''}`,
                    email: userData.email_addresses?.[0]?.email_address,
                    image: userData.image_url
                },
                { new: true }
            );

            return apiResponse(res, 200, "User updated", updatedUser);
        }

        if (event.type === 'user.deleted') {
            const userData = event.data;

            const deletedUser = await userModel.findOneAndDelete({
                clerkUserId: userData.id
            });

            return apiResponse(res, 200, "User deleted", deletedUser);
        }

        return res.status(200).json({ message: "Event ignored" });

    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, "Webhook error");
    }
});

module.exports = router;