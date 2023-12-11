import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

/**
 * Handles the POST request for creating a new prompt.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - The response containing the newly created prompt.
 * @throws {Error} - If there is an error while saving the prompt.
 */
export const POST = async (req, res) => {
    const {userId, prompt, tag} = await req.json();

    try {
        await connectToDB()
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
        })
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error) {
        return new Response(error.message, {status: 500})
    }
}