import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ContentService } from './content.service';
import { Content, ContentDocument } from '../schemas/content.schema';
import { User } from '../schemas/users.schema';
import { CreateContentDto } from '../content/dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { RateContentDto } from './dto/rateContent.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ContentService', () => {
  let contentService: ContentService;
  let contentModel: any;
  let userModel: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        {
          provide: getModelToken(Content.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            updateOne: jest.fn(),
            exists: jest.fn(),
            findByIdAndRemove: jest.fn(),
          },
        },
        {
          provide: getModelToken('User'),
          useValue: {
            findById: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    contentService = module.get<ContentService>(ContentService);
    contentModel = module.get(getModelToken(Content.name));
    userModel = module.get(getModelToken('User'));
  });

  describe('createContent', () => {
    const createContentDto: any = {
      "title": "Hector senior",
       "author_id": "hectico",
       "description": "Example Description",
          "price": 10.99,
          "category": "Example Category",
          "dificulty": 2,
          "sales": true,
          "content": "Example Content"
    };
    const userId = 'user-id';
    const createdContent: any = {
      "title": "Hector senior",
      "author_id": "hectico",
      "description": "Example Description",
         "price": 10.99,
         "category": "Example Category",
         "dificulty": 2,
         "sales": true,
         "content": "Example Content"
    };
    const user:any = {
     
      "name": "Team Latin",
      "user_name": "hesha12345",
      "password": "jauiod", 
      "email": "hesha@example.com",
      "wallet_balance": 1000,
      "chat":"Lorem ipsum dolor sit amet...",
       "id_published_content":[""], 
       "id_bought_content": [""],
    };

    it('should create a new content and associate it with the user', async () => {
      contentModel.create.mockResolvedValue(createdContent);
      userModel.findById.mockResolvedValue(user);
      const contentSaveSpy = jest.spyOn(createdContent, 'save');
      const userSaveSpy = jest.spyOn(user, 'save');

      const result = await contentService.createContent(createContentDto, userId);

      expect(contentModel.create).toHaveBeenCalledWith({
        ...createContentDto,
        price: 10,
        author: userId,
      });
      expect(userModel.findById).toHaveBeenCalledWith(userId);
      expect(contentSaveSpy).toHaveBeenCalled();
      expect(userSaveSpy).toHaveBeenCalled();
      expect(result).toEqual(createdContent);
    });

    // Agrega más casos de prueba según tus requerimientos
  });

  describe('findAll', () => {
    it('should return an array of content', async () => {
      const contentList: Content[] = [
        // Aquí van los datos de los contenidos
      ];
      contentModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(contentList) });

      const result = await contentService.findAll();

      expect(contentModel.find).toHaveBeenCalled();
      expect(result).toEqual(contentList);
    });

    // Agrega más casos de prueba según tus requerimientos
  });

  describe('findOne', () => {
    const contentId = 'content-id';
    const content: any = {
      "title": "Hector senior",
      "author_id": "hectico",
      "description": "Example Description",
         "price": 10.99,
         "category": "Example Category",
         "dificulty": 2,
         "sales": true,
         "content": "Example Content"
    };

    it('should return a content by ID', async () => {
      contentModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(content) });

      const result = await contentService.findOne(contentId);

      expect(contentModel.findOne).toHaveBeenCalledWith({ _id: contentId });
      expect(result).toEqual(content);
    });

    // Agrega más casos de prueba según tus requerimientos
  });

  describe('update', () => {
    const contentId = 'content-id';
    const updateContentDto: UpdateContentDto = {
      // Aquí van los datos del DTO de actualización
    };
    const content: any = {
      _id: contentId,
      save: jest.fn(),
    };

    beforeEach(() => {
      contentModel.findById.mockResolvedValue(content);
    });

    it('should update a content', async () => {
      const contentSaveSpy = jest.spyOn(content, 'save');

      const result = await contentService.update(contentId, updateContentDto);

      expect(contentModel.findById).toHaveBeenCalledWith(contentId);
      expect(Object.assign).toHaveBeenCalledWith(content, updateContentDto);
      expect(contentSaveSpy).toHaveBeenCalled();
      expect(result).toEqual(content);
    });

    it('should throw an exception if content is not found', async () => {
      contentModel.findById.mockResolvedValue(null);

      await expect(contentService.update(contentId, updateContentDto)).rejects.toThrowError(
        new HttpException('Content not Found', HttpStatus.BAD_REQUEST),
      );
    });

    // Agrega más casos de prueba según tus requerimientos
  });

  describe('delete', () => {
    const contentId = 'content-id';
    const content: any= {
      "title": "Hector senior",
      "author_id": "hectico",
      "description": "Example Description",
         "price": 10.99,
         "category": "Example Category",
         "dificulty": 2,
         "sales": true,
         "content": "Example Content"
    };
    const deletedContent: any = {
      "title": "Hector senior",
       "author_id": "hectico",
       "description": "Example Description",
          "price": 10.99,
          "category": "Example Category",
          "dificulty": 2,
          "sales": true,
          "content": "Example Content"
      // Aquí van los datos del contenido eliminado
    };

    beforeEach(() => {
      contentModel.findById.mockResolvedValue(content);
    });

    it('should delete a content', async () => {
      contentModel.exists.mockResolvedValue(false);
      contentModel.findByIdAndRemove.mockResolvedValue(deletedContent);

      const result = await contentService.delete(contentId);

      expect(contentModel.findById).toHaveBeenCalledWith(contentId);
      expect(contentModel.exists).toHaveBeenCalledWith({ id_bought_content: contentId });
      expect(contentModel.findByIdAndRemove).toHaveBeenCalledWith({ _id: contentId });
      expect(result).toEqual(deletedContent);
    });

    it('should throw an exception if content is not found', async () => {
      contentModel.findById.mockResolvedValue(null);

      await expect(contentService.delete(contentId)).rejects.toThrowError(
        new HttpException('Content not Found', HttpStatus.BAD_REQUEST),
      );
    });

    it('should throw an exception if content has been purchased', async () => {
      contentModel.exists.mockResolvedValue(true);

      await expect(contentService.delete(contentId)).rejects.toThrowError(
        new HttpException('Content cannot be deleted as it has been purchased', HttpStatus.FORBIDDEN),
      );
    });

    // Agrega más casos de prueba según tus requerimientos
  });

  describe('buyContent', () => {
    const contentId = 'content-id';
    const userId = 'user-id';
    const content: any = {
      "title": "Hector senior",
      "author_id": "hectico",
      "description": "Example Description",
         "price": 10.99,
         "category": "Example Category",
         "dificulty": 2,
         "sales": true,
         "content": "Example Content"
    };
    const user: any = {
      "name": "Team Latin",
      "user_name": "hesha12345",
      "password": "jauiod", 
      "email": "hesha@example.com",
      "wallet_balance": 1000,
      "chat":"Lorem ipsum dolor sit amet...",
       "id_published_content":[""], 
       "id_bought_content": [""],
      // Aquí van los datos del usuario
    };

    beforeEach(() => {
      contentModel.findById.mockResolvedValue(content);
      userModel.findById.mockResolvedValue(user);
    });

    it('should buy a content for a user', async () => {
      user.id_bought_content = [];

      const result = await contentService.buyContent(userId, contentId);

      expect(contentModel.findById).toHaveBeenCalledWith(contentId);
      expect(userModel.findById).toHaveBeenCalledWith(userId);
      expect(user.id_bought_content).toContain(contentId);
      expect(user.save).toHaveBeenCalled();
      expect(content.sales).toBe(true);
      expect(content.save).toHaveBeenCalled();
      expect(result).toEqual(content);
    });

    it('should throw an exception if content is not found', async () => {
      contentModel.findById.mockResolvedValue(null);

      await expect(contentService.buyContent(userId, contentId)).rejects.toThrowError(
        new HttpException('Content not Found', HttpStatus.NOT_FOUND),
      );
    });

    it('should throw an exception if user is not found', async () => {
      userModel.findById.mockResolvedValue(null);

      await expect(contentService.buyContent(userId, contentId)).rejects.toThrowError(
        new HttpException('User not Found', HttpStatus.NOT_FOUND),
      );
    });

    it('should throw an exception if content has already been purchased by the user', async () => {
      user.id_bought_content = [contentId];

      await expect(contentService.buyContent(userId, contentId)).rejects.toThrowError(
        new HttpException('Content already purchased', HttpStatus.CONFLICT),
      );
    });

    // Agrega más casos de prueba según tus requerimientos
  });

  describe('getBoughtContent', () => {
    const userId = 'user-id';
    const user: any = {
      "name": "Team Latin",
      "user_name": "hesha12345",
      "password": "jauiod", 
      "email": "hesha@example.com",
      "wallet_balance": 1000,
      "chat":"Lorem ipsum dolor sit amet...",
       "id_published_content":[""], 
       "id_bought_content": [""],
      // Aquí van los datos del usuario
    };
    const boughtContent: Content[] = [
      // Aquí van los datos de los contenidos comprados
    ];

    beforeEach(() => {
      userModel.findById.mockResolvedValue(user);
      contentModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(boughtContent),
      });
    });

    it('should return an array of bought content for a user', async () => {
      const result = await contentService.getBoughtContent(userId);

      expect(userModel.findById).toHaveBeenCalledWith(userId);
      expect(contentModel.find).toHaveBeenCalledWith({
        _id: { $in: user.id_bought_content },
      });
      expect(result).toEqual(boughtContent);
    });

    it('should throw an exception if user is not found', async () => {
      userModel.findById.mockResolvedValue(null);

      await expect(contentService.getBoughtContent(userId)).rejects.toThrowError(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
    });

    // Agrega más casos de prueba según tus requerimientos
  });

  describe('addComment', () => {
    const contentId = 'content-id';
    const comment: any = {
      // Aquí van los datos del comentario
    };
    const contentComment: any = {
      _id: contentId,
      comments: [],
      save: jest.fn(),
    };

    beforeEach(() => {
      contentModel.findById.mockResolvedValue(contentComment);
    });

    it('should add a comment to a content', async () => {
      const contentSaveSpy = jest.spyOn(contentComment, 'save');

      const result = await contentService.addComment(contentId, comment);

      expect(contentModel.findById).toHaveBeenCalledWith(contentId);
      expect(contentComment.comments).toContain(comment);
      expect(contentSaveSpy).toHaveBeenCalled();
      expect(result).toEqual(contentComment);
    });

    // Agrega más casos de prueba según tus requerimientos
  });

  describe('rateContent', () => {
    const contentId = 'content-id';
    const rateContentDto: RateContentDto = {
      rating : 3,
      // Aquí van los datos del DTO de valoración
    };
    const content: any = {
      _id: contentId,
      ratings: [],
      averageRating: 0,
      price: 10,
      save: jest.fn(),
    };

    beforeEach(() => {
      contentModel.findById.mockResolvedValue(content);
    });

    it('should rate a content and update its average rating', async () => {
      const contentSaveSpy = jest.spyOn(content, 'save');

      const result = await contentService.rateContent(contentId, rateContentDto);

      expect(contentModel.findById).toHaveBeenCalledWith(contentId);
      expect(content.ratings).toContain(rateContentDto.rating);
      expect(content.averageRating).toBeCloseTo(rateContentDto.rating, 2);
      expect(contentSaveSpy).toHaveBeenCalled();
      expect(result).toEqual(content);
    });

    
  });
});
