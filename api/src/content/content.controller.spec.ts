import { Test, TestingModule } from '@nestjs/testing';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateContentDto } from '../content/dto/create-content.dto';
import { Content } from '../schemas/content.schema';
import { UpdateContentDto } from './dto/update-content.dto';




describe('ContentController', () => {
  let controller: ContentController;
  let service: ContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentController],
      providers: [
        ContentService,
        {
          provide: getModelToken(Content.name),
          useValue: {},
        },
        {
          provide: getModelToken('User'),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ContentController>(ContentController);
    service = module.get<ContentService>(ContentService);
  });

  describe('createContent', () => {
    it('should create content', async () => {
      // Arrange
      const userId = 'user123';
      const contentDto: CreateContentDto = {
        title: 'Sample Content',
        author_id: 'author123',
        description: 'Sample description',
        price: 9.99,
        created_at: new Date(),
        update: new Date(),
        category: 'Sample category',
        dificulty: 1,
        sales: true,
        content: 'Sample content',
      };
      const createdContent:any = {
        _id: 'content123',
        ...contentDto,
        comments: [],
      };
      jest
        .spyOn(service, 'createContent')
        .mockResolvedValue(createdContent);

      // Act
      const result: Content = await controller.createContent(
        userId,
        contentDto,
      );

      // Assert
      expect(result).toBe(createdContent);
      expect(service.createContent).toHaveBeenCalledWith(contentDto, userId);
    });
  });

  describe('findAll', () => {
    it('should return an array of contents', async () => {
      // Arrange
      const contents: any = [
        {
          _id: 'content123',
          title: 'Sample Content 1',
          author_id: 'author123',
          description: 'Sample description 1',
          price: 9.99,
          created_at: new Date(),
          update: new Date(),
          category: 'Sample category 1',
          dificulty: 1,
          sales: true,
          content: 'Sample content 1',
          comments: [],
        },
        {
          _id: 'content456',
          title: 'Sample Content 2',
          author_id: 'author456',
          description: 'Sample description 2',
          price: 19.99,
          created_at: new Date(),
          update: new Date(),
          category: 'Sample category 2',
          dificulty: 2,
          sales: false,
          content: 'Sample content 2',
          comments: [],
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(contents);

      // Act
      const result: Content[] = await controller.findAll();

      // Assert
      expect(result).toBe(contents);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a content by id', async () => {
      // Arrange
      const contentId = 'content123';
      const content: any = {
        _id: contentId,
        title: 'Sample Content',
        author_id: 'author123',
        description: 'Sample description',
        price: 9.99,
        created_at: new Date(),
        update: new Date(),
        category: 'Sample category',
        dificulty: 1,
        sales: true,
        content: 'Sample content',
        comments: [],
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(content);

      // Act
      const result: Content = await controller.findOne(contentId);

      // Assert
      expect(result).toBe(content);
      expect(service.findOne).toHaveBeenCalledWith(contentId);
    });
  });

  describe('update', () => {
    it('should update a content', async () => {
      // Arrange
      const contentId = 'content123';
      const updateContentDto: UpdateContentDto = {
        title: 'Updated Content',
        description: 'Updated description',
        price: 19.99,
        category: 'Updated category',
        dificulty: 2,
      };
      const updatedContent: any = {
        _id: contentId,
        title: 'Updated Content',
        author_id: 'author123',
        description: 'Updated description',
        price: 19.99,
        created_at: new Date(),
        update: new Date(),
        category: 'Updated category',
        dificulty: 2,
        sales: true,
        content: 'Sample content',
        comments: [],
      };
      jest.spyOn(service, 'update').mockResolvedValue(updatedContent);

      // Act
      const result: Content = await controller.update(
        contentId,
        updateContentDto,
      );

      // Assert
      expect(result).toBe(updatedContent);
      expect(service.update).toHaveBeenCalledWith(contentId, updateContentDto);
    });
  });

  describe('delete', () => {
    it('should delete a content', async () => {
      // Arrange
      const contentId = 'content123';
      const deletedContent: any = {
        _id: contentId,
        title: 'Sample Content',
        author_id: 'author123',
        description: 'Sample description',
        price: 9.99,
        created_at: new Date(),
        update: new Date(),
        category: 'Sample category',
        dificulty: 1,
        sales: true,
        content: 'Sample content',
        comments: [],
      };
      jest.spyOn(service, 'delete').mockResolvedValue(deletedContent);

      // Act
      const result: Content = await controller.delete(contentId);

      // Assert
      expect(result).toBe(deletedContent);
      expect(service.delete).toHaveBeenCalledWith(contentId);
    });
  });

  describe('buyContent', () => {
    it('should buy a content', async () => {
      // Arrange
      const userId = 'user123';
      const contentId = 'content123';
      const content: any = {
        _id: contentId,
        title: 'Sample Content',
        author_id: 'author123',
        description: 'Sample description',
        price: 9.99,
        created_at: new Date(),
        update: new Date(),
        category: 'Sample category',
        dificulty: 1,
        sales: true,
        content: 'Sample content',
        comments: [],
      };
      jest.spyOn(service, 'buyContent').mockResolvedValue(content);

      // Act
      const result: Content = await controller.buyContent(userId, contentId);

      // Assert
      expect(result).toBe(content);
      expect(service.buyContent).toHaveBeenCalledWith(userId, contentId);
    });
  });

  describe('getBoughtContent', () => {
    it('should return an array of bought contents by user id', async () => {
      // Arrange
      const userId = 'user123';
      const contents: any = [
        {
          _id: 'content123',
          title: 'Sample Content 1',
          author_id: 'author123',
          description: 'Sample description 1',
          price: 9.99,
          created_at: new Date(),
          update: new Date(),
          category: 'Sample category 1',
          dificulty: 1,
          sales: true,
          content: 'Sample content 1',
          comments: [],
        },
        {
          _id: 'content456',
          title: 'Sample Content 2',
          author_id: 'author456',
          description: 'Sample description 2',
          price: 19.99,
          created_at: new Date(),
          update: new Date(),
          category: 'Sample category 2',
          dificulty: 2,
          sales: false,
          content: 'Sample content 2',
          comments: [],
        },
      ];
      jest
        .spyOn(service, 'getBoughtContent')
        .mockResolvedValue(contents);

      // Act
      const result: Content[] = await controller.getBoughtContent(userId);

      // Assert
      expect(result).toBe(contents);
      expect(service.getBoughtContent).toHaveBeenCalledWith(userId);
    });
  });

  describe('addComment', () => {
    it('should add a comment to a content', async () => {
      // Arrange
      const contentId = 'content123';
      const commentDto: any = {
        text: 'Sample comment',
        author: 'user123',
      };
      const content: any = {
        _id: contentId,
        title: 'Sample Content',
        author_id: 'author123',
        description: 'Sample description',
        price: 9.99,
        created_at: new Date(),
        update: new Date(),
        category: 'Sample category',
        dificulty: 1,
        sales: true,
        content: 'Sample content',
        comments: [],
      };
      const updatedContent: any = {
        ...content,
        comments: [commentDto],
      };
      jest.spyOn(service, 'addComment').mockResolvedValue(updatedContent);

      // Act
      const result: Content = await controller.addComment(
        contentId,
        commentDto,
      );

      // Assert
      expect(result).toBe(updatedContent);
      expect(service.addComment).toHaveBeenCalledWith(contentId, commentDto);
    });
  });
});

