import Logo from '../models/Logo';

export default {
    render(image: Logo) {
        return {
            id: image.id,
            url: `http://localhost:3333/uploads/${image.path}`
        };
    },
};